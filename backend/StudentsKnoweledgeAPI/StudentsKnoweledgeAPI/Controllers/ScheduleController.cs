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

        private IQueryable<Schedule> GetScheduleWithEntries()
        {
            return _context.Schedules
                .Include(s => s.Entries);  
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IActionResult CreateOrUpdateSchedule([FromBody] ScheduleDto scheduleDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var groupExists = _context.Groups.Any(g => g.Id == scheduleDto.GroupId);
            if (!groupExists)
                return NotFound("Group not found");

            var existingSchedule = _context.Schedules
                .Include(s => s.Entries)
                .FirstOrDefault(s => s.GroupId == scheduleDto.GroupId);

            if (existingSchedule != null)
            {
                var newEntry = new ScheduleEntry
                {
                    Subject = scheduleDto.Entries[0].Subject,
                    Classroom = scheduleDto.Entries[0].Classroom,
                    StartTime = TimeSpan.Parse(scheduleDto.Entries[0].StartTime),
                    EndTime = TimeSpan.Parse(scheduleDto.Entries[0].EndTime),
                    Day = scheduleDto.Entries[0].Day,
                    IsNumerator = scheduleDto.Entries[0].IsNumerator,
                    IsDenominator = scheduleDto.Entries[0].IsDenominator
                };

                existingSchedule.Entries.Add(newEntry);

                _context.Schedules.Update(existingSchedule);
                _context.SaveChanges();
                return Ok(existingSchedule);
            }
            else
            {
                var newSchedule = new Schedule
                {
                    GroupId = scheduleDto.GroupId,
                    Entries = scheduleDto.Entries.Select(entryDto => new ScheduleEntry
                    {
                        Subject = entryDto.Subject,
                        Classroom = entryDto.Classroom,
                        StartTime = TimeSpan.Parse(entryDto.StartTime),
                        EndTime = TimeSpan.Parse(entryDto.EndTime),
                        Day = entryDto.Day,
                        IsNumerator = entryDto.IsNumerator,
                        IsDenominator = entryDto.IsDenominator
                    }).ToList()
                };

                _context.Schedules.Add(newSchedule);
                _context.SaveChanges();
                return Ok(newSchedule);
            }

            
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

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public IActionResult UpdateSchedule(int id, [FromBody] ScheduleDto updatedScheduleDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingSchedule = GetScheduleWithEntries()
                .FirstOrDefault(s => s.Id == id);

            if (existingSchedule == null)
                return NotFound();

            foreach (var entry in updatedScheduleDto.Entries)
            {
                var existingEntry = existingSchedule.Entries
                    .FirstOrDefault(e => e.Subject == entry.Subject && e.Day == entry.Day && e.StartTime == TimeSpan.Parse(entry.StartTime));

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

            _context.SaveChanges();

            return NotFound();
        }



        [HttpDelete("{entryId}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteScheduleEntry(int entryId)
        {
            var entry = _context.ScheduleEntries.FirstOrDefault(e => e.Id == entryId);

            if (entry == null)
                return NotFound();

            _context.ScheduleEntries.Remove(entry);
            _context.SaveChanges();
            return NoContent();
        }


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
