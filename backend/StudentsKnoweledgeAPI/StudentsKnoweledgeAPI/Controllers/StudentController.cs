using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AppDbContext _context;

        public StudentController(UserManager<AppUser> userManager, AppDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await _context.Students.Include(s => s.Group).ToListAsync();
            return Ok(students);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudentById(string id)
        {
            var student = await _context.Students.Include(s => s.Group).FirstOrDefaultAsync(s => s.Id == id);

            if (student == null)
                return NotFound(new { message = "Student not found." });

            return Ok(student);
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudent([FromBody] CreateStudentRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var group = await _context.Groups.FindAsync(request.GroupId);
            if (group == null)
                return BadRequest(new { message = "Group not found." });

            var newStudent = new Student
            {
                UserName = request.UserName,
                Role = UserRole.Student,
                Group = group
            };

            var result = await _userManager.CreateAsync(newStudent, request.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = "Student created successfully.", studentId = newStudent.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(string id, [FromBody] UpdateStudentRequest request)
        {
            var student = await _context.Students.Include(s => s.Group).FirstOrDefaultAsync(s => s.Id == id);

            if (student == null)
                return NotFound(new { message = "Student not found." });

            if (request.GroupId.HasValue)
            {
                var group = await _context.Groups.FindAsync(request.GroupId.Value);
                if (group == null)
                    return BadRequest(new { message = "Group not found." });

                student.Group = group;
            }

            student.UserName = request.UserName ?? student.UserName;

            _context.Entry(student).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Student updated successfully.", student });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
                return NotFound(new { message = "Student not found." });

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Student deleted successfully." });
        }
    }
}
