using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;
using System.Security.Claims;

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


        [HttpGet]
        public async Task<IActionResult> GetAllEvents()
        {
            var events = await _context.Events.Include(e => e.Course).ToListAsync();
            return Ok(events);
        }

        [HttpGet("user-events")]
        public async Task<IActionResult> GetUserEvents()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);


            var userCourses = await _context.Courses
                .Where(c => c.Groups.Any(g => g.Students.Any(s => s.Id.ToString() == userId))
                            || c.Teachers.Any(t => t.Id.ToString() == userId))
                .ToListAsync();

            if (!userCourses.Any())
            {
                return NotFound(new { message = "User is not enrolled in any courses." });
            }

            var events = await _context.Events
                .Where(e => userCourses.Select(c => c.Id).Contains(e.CourseId))
                .Include(e => e.Course)                                        
                .ToListAsync();

            return Ok(events);
        }





        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventById(int id)
        {
            var evnt = await _context.Events.Include(e => e.Course).FirstOrDefaultAsync(e => e.Id == id);

            if (evnt == null)
                return NotFound(new { message = "Event not found." });

            return Ok(evnt);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateEvent([FromBody] CreateEventRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var course = await _context.Courses.FindAsync(request.CourseId);
            if (course == null)
                return BadRequest(new { message = "Course not found." });

            var material = await _context.Materials.FindAsync(request.MaterialId);
            if (material == null)
                return BadRequest(new { message = "Material not found." });

            var newEvent = new Event
            {
                CourseId = request.CourseId,
                OpenDate = request.OpenDate,
                CloseDate = request.CloseDate,
                MaterialId = request.MaterialId
            };

            newEvent.Name = material.Title;

            if (material.Type == "Task")  
            {
                newEvent.URL = $"/system/courses/course/{request.CourseId}/task/{request.MaterialId}";
            }
            else
            {
                newEvent.URL = $"/system/courses/course/{request.CourseId}";
            }

            await _context.Events.AddAsync(newEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEventById), new { id = newEvent.Id }, newEvent);
        }




        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] Event updatedEvent)
        {
            var evnt = await _context.Events.FindAsync(id);

            if (evnt == null)
                return NotFound(new { message = "Event not found." });

            evnt.OpenDate = updatedEvent.OpenDate;
            evnt.CloseDate = updatedEvent.CloseDate;

            _context.Entry(evnt).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(evnt);
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
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
