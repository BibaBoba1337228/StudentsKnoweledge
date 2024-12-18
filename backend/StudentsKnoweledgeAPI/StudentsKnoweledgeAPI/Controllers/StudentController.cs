using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
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


        [HttpGet("paginated")]
        public async Task<IActionResult> GetAllStudentsPaginated([FromQuery] int page, [FromQuery] int limit)
        {
            var totalStudents = await _context.Students.CountAsync();


            var students = await _context.Students
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            var preparedStudents = students.Select(student =>
            new
            {
                id = student.Id,
                userName = student.UserName,
                name = student.Name,
                lastName = student.LastName,
                middleName = student.MiddleName,
                group = new
                {
                    name = student.Group?.Name,
                },
                groupId = student.GroupId,
                phone = student.Phone,
                mail = student.Mail

            }).ToList();

            var result = new
            {
                TotalCount = totalStudents,
                Data = preparedStudents
            };
            return Ok(result);
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
                return BadRequest(new { message = "Group not found. "+request.GroupId });

            var newStudent = new Student
            {
                UserName = request.UserName,
                Mail = request.Mail,  // Добавили email
                Name = request.Name,  // Добавили имя
                LastName = request.LastName,  // Добавили фамилию
                MiddleName = request.MiddleName,  // Добавили отчество
                Phone = request.Phone,  // Добавили телефон
                Role = UserRole.Student,
                Group = group
            };

            var result = await _userManager.CreateAsync(newStudent, request.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(newStudent);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(string id, [FromBody] UpdateStudentRequest request)
        {
            var student = await _context.Students.Include(s => s.Group).FirstOrDefaultAsync(s => s.Id == id);

            if (student == null)
                return NotFound(new { message = "Student not found." });


            if (request.GroupId > 0)
            {
                var group = await _context.Groups.FindAsync(request.GroupId);
                if (group == null)
                    return BadRequest(new { message = "Group not found." });

                student.Group = group;
            }

            student.UserName = request.UserName ?? student.UserName;
            student.Mail = request.Mail ?? student.Mail;
            student.Name = request.Name ?? student.Name;
            student.LastName = request.LastName ?? student.LastName;
            student.MiddleName = request.MiddleName ?? student.MiddleName;
            student.Phone = request.Phone ?? student.Phone;

            if (!string.IsNullOrEmpty(request.Password))
            {
                var user = await _userManager.FindByIdAsync(student.Id);



                if (user == null)
                    return NotFound(new { message = "User not found." });

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                var result = await _userManager.ResetPasswordAsync(user, token, request.Password);


                if (!result.Succeeded)
                {
                    return BadRequest(new { message = "Failed to change password.", errors = result.Errors });
                }

            }

            // Mark the student entity as modified
            _context.Entry(student).State = EntityState.Modified;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(student);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(string id)
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
