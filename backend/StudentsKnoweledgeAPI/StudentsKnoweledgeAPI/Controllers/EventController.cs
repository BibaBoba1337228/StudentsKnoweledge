using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/events/[controller]")]
    [ApiController]
    [Authorize]
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

        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] CreateEventRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Найдем курс по CourseId
            var course = await _context.Courses.FindAsync(request.CourseId);
            if (course == null)
                return BadRequest(new { message = "Course not found." });

            // Найдем материал по MaterialId
            var material = await _context.Materials.FindAsync(request.MaterialId);
            if (material == null)
                return BadRequest(new { message = "Material not found." });

            // Создаем новое событие
            var newEvent = new Event
            {
                CourseId = request.CourseId,
                OpenDate = request.OpenDate,
                CloseDate = request.CloseDate,
                MaterialId = request.MaterialId
            };

            // Подтягиваем имя материала
            newEvent.Name = material.Title;

            // Генерация URL в зависимости от типа материала
            if (material.Type == "Task")  // Например, если тип материала - TaskMaterial
            {
                newEvent.URL = $"/system/courses/course/{request.CourseId}/task/{request.MaterialId}";
            }
            else
            {
                newEvent.URL = $"/system/courses/course/{request.CourseId}";
            }

            // Сохраняем событие
            await _context.Events.AddAsync(newEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEventById), new { id = newEvent.Id }, newEvent);
        }




        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] Event updatedEvent)
        {
            // Find the event by its ID
            var evnt = await _context.Events.FindAsync(id);

            if (evnt == null)
                return NotFound(new { message = "Event not found." });

            // Only update the OpenDate and CloseDate properties
            evnt.OpenDate = updatedEvent.OpenDate;
            evnt.CloseDate = updatedEvent.CloseDate;

            // Mark the event as modified and save the changes
            _context.Entry(evnt).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            // Return the updated event
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
