using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventController(AppDbContext context)
        {
            _context = context;
        }

        // Получение всех событий
        [HttpGet]
        public async Task<IActionResult> GetAllEvents()
        {
            var events = await _context.Events.Include(e => e.Course).ToListAsync();
            return Ok(events);
        }

        // Получение события по ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventById(int id)
        {
            var evnt = await _context.Events.Include(e => e.Course).FirstOrDefaultAsync(e => e.Id == id);

            if (evnt == null)
                return NotFound(new { message = "Event not found." });

            return Ok(evnt);
        }

        // Создание нового события
        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] Event newEvent)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var course = await _context.Courses.FindAsync(newEvent.CourseId);
            if (course == null)
                return BadRequest(new { message = "Course not found." });

            newEvent.Course = course;

            await _context.Events.AddAsync(newEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEventById), new { id = newEvent.Id }, newEvent);
        }

        // Обновление события
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] Event updatedEvent)
        {
            var evnt = await _context.Events.FindAsync(id);

            if (evnt == null)
                return NotFound(new { message = "Event not found." });

            // Проверка существования курса, если CourseId передан
            if (updatedEvent.CourseId > 0 && updatedEvent.CourseId != evnt.CourseId)
            {
                var course = await _context.Courses.FindAsync(updatedEvent.CourseId);
                if (course == null)
                    return BadRequest(new { message = "Course not found." });

                evnt.Course = course;
            }

            // Обновление свойств
            evnt.OpenDate = updatedEvent.OpenDate;
            evnt.CloseDate = updatedEvent.CloseDate;
            evnt.URL = updatedEvent.URL;

            _context.Entry(evnt).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(evnt);
        }

        // Удаление события
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var evnt = await _context.Events.FindAsync(id);

            if (evnt == null)
                return NotFound(new { message = "Event not found." });

            _context.Events.Remove(evnt);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Event deleted successfully." });
        }
    }
}
