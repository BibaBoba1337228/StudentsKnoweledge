using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates.DTO;

namespace StudentsKnoweledgeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScheduleController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ScheduleController(AppDbContext context)
        {
            _context = context;
        }

        // Общий метод для получения расписания с учётом связанных данных
        private IQueryable<Schedule> GetScheduleWithEntries()
        {
            return _context.Schedules
                .Include(s => s.Entries);  // Подключаем связанные записи расписания
        }

        // Создать расписание
        [HttpPost]
        public IActionResult CreateSchedule([FromBody] ScheduleDto scheduleDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Проверяем существование группы
            var groupExists = _context.Groups.Any(g => g.Id == scheduleDto.GroupId);
            if (!groupExists)
                return NotFound("Group not found");

            // Создаем объект расписания на основе DTO
            var schedule = new Schedule
            {
                GroupId = scheduleDto.GroupId,
                Entries = scheduleDto.Entries.Select(entry => new ScheduleEntry
                {
                    Subject = entry.Subject,
                    Classroom = entry.Classroom,
                    StartTime = TimeSpan.Parse(entry.StartTime),
                    EndTime = TimeSpan.Parse(entry.EndTime),
                    Day = entry.Day,
                    IsNumerator = entry.IsNumerator,
                    IsDenominator = entry.IsDenominator
                }).ToList()
            };

            _context.Schedules.Add(schedule);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetScheduleById), new { id = schedule.Id }, schedule);
        }

        // Получить расписание по ID
        [HttpGet("{id}")]
        public IActionResult GetScheduleById(int id)
        {
            var schedule = GetScheduleWithEntries()
                .FirstOrDefault(s => s.Id == id);

            if (schedule == null)
                return NotFound();

            return Ok(schedule);
        }

        // Обновить расписание
        [HttpPut("{id}")]
        public IActionResult UpdateSchedule(int id, [FromBody] ScheduleDto updatedScheduleDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingSchedule = GetScheduleWithEntries()
                .FirstOrDefault(s => s.Id == id);

            if (existingSchedule == null)
                return NotFound();

            // Обновляем данные расписания
            existingSchedule.Entries = updatedScheduleDto.Entries.Select(entry => new ScheduleEntry
            {
                Subject = entry.Subject,
                Classroom = entry.Classroom,
                StartTime = TimeSpan.Parse(entry.StartTime),
                EndTime = TimeSpan.Parse(entry.EndTime),
                Day = entry.Day,
                IsNumerator = entry.IsNumerator,
                IsDenominator = entry.IsDenominator
            }).ToList();

            _context.SaveChanges();
            return NoContent();
        }

        // Удалить расписание
        [HttpDelete("{id}")]
        public IActionResult DeleteSchedule(int id)
        {
            var schedule = GetScheduleWithEntries()
                .FirstOrDefault(s => s.Id == id);

            if (schedule == null)
                return NotFound();

            _context.Schedules.Remove(schedule);
            _context.SaveChanges();
            return NoContent();
        }

        // Получить расписание по группе
        [HttpGet("group/{groupId}")]
        public IActionResult GetScheduleByGroup(int groupId)
        {
            var schedule = GetScheduleWithEntries()
                .FirstOrDefault(s => s.GroupId == groupId);

            if (schedule == null)
                return NotFound();

            return Ok(schedule);
        }
    }
}
