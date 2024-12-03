using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;
using System.Security.Claims;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CourseController(AppDbContext context)
        {
            _context = context;
        }

        // ----- Управление разделами курса -----

        [HttpGet("{courseId}/Sections")]
        public async Task<IActionResult> GetSectionsByCourseId(int courseId)
        {
            var course = await _context.Courses.Include(c => c.Sections).FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            return Ok(course.Sections);
        }


        [HttpPost("{courseId}/Sections")]
        public async Task<IActionResult> AddSectionToCourse(int courseId, [FromBody] CreateCourseSectionRequest section)
        {
            var course = await _context.Courses.FindAsync(courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            var newSection = new Section
            {
                Name = section.Name,
                CourseId = courseId
            };

            _context.Sections.Add(newSection);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSectionsByCourseId), new { courseId }, newSection);
        }

        [HttpPut("{courseId}/Sections/{sectionId}")]
        public async Task<IActionResult> UpdateSection(int courseId, int sectionId, [FromBody] Section updatedSection)
        {
            var section = await _context.Sections.FirstOrDefaultAsync(s => s.Id == sectionId && s.CourseId == courseId);

            if (section == null)
                return NotFound(new { message = "Section not found." });

            section.Name = updatedSection.Name;

            _context.Entry(section).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Section updated successfully.", section });
        }

        [HttpDelete("{courseId}/Sections/{sectionId}")]
        public async Task<IActionResult> DeleteSection(int courseId, int sectionId)
        {
            var section = await _context.Sections.FirstOrDefaultAsync(s => s.Id == sectionId && s.CourseId == courseId);

            if (section == null)
                return NotFound(new { message = "Section not found." });

            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Section deleted successfully." });
        }


        // ----- Управление преподавателями курса -----

        [HttpGet("{courseId}/Teachers")]
        public async Task<IActionResult> GetTeachersByCourseId(int courseId)
        {
            var course = await _context.Courses
                .Include(c => c.Teachers)
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            return Ok(course.Teachers);
        }

        [HttpPost("{courseId}/AddTeacher/{teacherId}")]
        public async Task<IActionResult> AddTeacherToCourse(int courseId, string teacherId)
        {
            var course = await _context.Courses.Include(c => c.Teachers).FirstOrDefaultAsync(c => c.Id == courseId);
            var teacher = await _context.Teachers.FindAsync(teacherId);

            if (course == null || teacher == null)
                return NotFound(new { message = "Course or teacher not found." });

            if (course.Teachers.Any(t => t.Id == teacherId))
                return BadRequest(new { message = "Teacher is already associated with this course." });

            course.Teachers.Add(teacher);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Teacher added to course successfully." });
        }

        [HttpDelete("{courseId}/RemoveTeacher/{teacherId}")]
        public async Task<IActionResult> RemoveTeacherFromCourse(int courseId, string teacherId)
        {
            var course = await _context.Courses.Include(c => c.Teachers).FirstOrDefaultAsync(c => c.Id == courseId);
            var teacher = await _context.Teachers.FindAsync(teacherId);

            if (course == null || teacher == null)
                return NotFound(new { message = "Course or teacher not found." });

            if (!course.Teachers.Any(t => t.Id == teacherId))
                return BadRequest(new { message = "Teacher is not associated with this course." });

            course.Teachers.Remove(teacher);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Teacher removed from course successfully." });
        }

        // ----- Управление группами курса -----


        [HttpGet("{courseId}/Groups")]
        public async Task<IActionResult> GetGroupsByCourseId(int courseId)
        {
            var course = await _context.Courses
                .Include(c => c.Groups)
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            return Ok(course.Groups);
        }

        [HttpPost("{courseId}/AddGroup/{groupId}")]
        public async Task<IActionResult> AddGroupToCourse(int courseId, int groupId)
        {
            var course = await _context.Courses.Include(c => c.Groups).FirstOrDefaultAsync(c => c.Id == courseId);
            var group = await _context.Groups.FindAsync(groupId);

            if (course == null || group == null)
                return NotFound(new { message = "Course or group not found." });

            if (course.Groups.Any(g => g.Id == groupId))
                return BadRequest(new { message = "Group is already associated with this course." });

            course.Groups.Add(group);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Group added to course successfully." });
        }

        [HttpDelete("{courseId}/RemoveGroup/{groupId}")]
        public async Task<IActionResult> RemoveGroupFromCourse(int courseId, int groupId)
        {
            var course = await _context.Courses.Include(c => c.Groups).FirstOrDefaultAsync(c => c.Id == courseId);
            var group = await _context.Groups.FindAsync(groupId);

            if (course == null || group == null)
                return NotFound(new { message = "Course or group not found." });

            if (!course.Groups.Any(g => g.Id == groupId))
                return BadRequest(new { message = "Group is not associated with this course." });

            course.Groups.Remove(group);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Group removed from course successfully." });
        }

        // ----- Управление курсом -----

        [HttpGet]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _context.Courses
                .Include(c => c.Groups)
                .Include(c => c.Teachers)
                .ToListAsync();

            return Ok(courses);
        }

        [HttpGet("UserCourses")]
        public async Task<IActionResult> GetCoursesByUser()
        {
            // Получаем текущего пользователя (например, из контекста запроса)
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);  // Assuming you are using JWT authentication
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            // Получаем список курсов, в которых пользователь состоит как студент или преподаватель
            var courses = await _context.Courses
                .Include(c => c.Groups)   // Включаем группы, чтобы проверить студентов
                .Include(c => c.Teachers) // Включаем преподавателей
                .Where(c => c.Groups.Any(g => g.Students.Any(s => s.Id.ToString() == userId)) || c.Teachers.Any(t => t.Id.ToString() == userId))
                .ToListAsync();

            if (!courses.Any())
            {
                return NotFound(new { message = "No courses found for the user." });
            }

            return Ok(courses);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourseById(int id)
        {
            var course = await _context.Courses
                .Include(c => c.Groups)
                .Include(c => c.Teachers)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            return Ok(course);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCourse([FromBody] Course course)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCourseById), new { id = course.Id }, course);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCourse(int id, [FromBody] Course updatedCourse)
        {
            if (id != updatedCourse.Id)
                return BadRequest(new { message = "Course ID mismatch." });

            var course = await _context.Courses.FindAsync(id);
            if (course == null)
                return NotFound(new { message = "Course not found." });

            course.Name = updatedCourse.Name;

            _context.Entry(course).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(course);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
                return NotFound(new { message = "Course not found." });

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Course deleted successfully." });
        }
    }
}
