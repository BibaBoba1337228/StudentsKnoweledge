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
        [HttpPut("{id}")]
        public IActionResult UpdateSchedule(int id, [FromBody] ScheduleDto updatedScheduleDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Получаем существующее расписание
            var existingSchedule = GetScheduleWithEntries()
                .FirstOrDefault(s => s.Id == id);

            if (existingSchedule == null)
                return NotFound();

            // Обновляем только те записи, которые были переданы в запросе
            foreach (var entry in updatedScheduleDto.Entries)
            {
                // Ищем существующую запись по уникальным полям (например, Subject, Day)
                var existingEntry = existingSchedule.Entries
                    .FirstOrDefault(e => e.Subject == entry.Subject && e.Day == entry.Day && e.StartTime == TimeSpan.Parse(entry.StartTime));

                // Если такая запись найдена, обновляем поля
                if (existingEntry != null)
                {
                    if (!string.IsNullOrEmpty(entry.Subject)) existingEntry.Subject = entry.Subject;
                    if (!string.IsNullOrEmpty(entry.Classroom)) existingEntry.Classroom = entry.Classroom;
                    if (!string.IsNullOrEmpty(entry.StartTime)) existingEntry.StartTime = TimeSpan.Parse(entry.StartTime);
                    if (!string.IsNullOrEmpty(entry.EndTime)) existingEntry.EndTime = TimeSpan.Parse(entry.EndTime);
                    if (!string.IsNullOrEmpty(entry.Day)) existingEntry.Day = entry.Day;
                    existingEntry.IsNumerator = entry.IsNumerator;
                    existingEntry.IsDenominator = entry.IsDenominator;
                    _context.SaveChanges();

                    return Ok(existingEntry);
                }
                else
                {
                    // Если запись не найдена, то можно создать новую или вернуть ошибку
                    // В этом примере создаем новую запись
                    var newEntry = new ScheduleEntry
                    {
                        Subject = entry.Subject,
                        Classroom = entry.Classroom,
                        StartTime = TimeSpan.Parse(entry.StartTime),
                        EndTime = TimeSpan.Parse(entry.EndTime),
                        Day = entry.Day,
                        IsNumerator = entry.IsNumerator,
                        IsDenominator = entry.IsDenominator
                    };
                    existingSchedule.Entries.Add(newEntry);

                    _context.SaveChanges();

                    return Ok(newEntry);
                }
            }

            // Сохраняем изменения
            _context.SaveChanges();

            return NotFound();
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
