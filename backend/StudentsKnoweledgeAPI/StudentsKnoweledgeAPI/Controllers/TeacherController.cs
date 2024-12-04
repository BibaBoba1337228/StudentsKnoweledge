using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AppDbContext _context;

        public TeacherController(UserManager<AppUser> userManager, AppDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTeachers()
        {
            var teachers = await _context.Teachers.Include(t => t.Courses).ToListAsync();
            return Ok(teachers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeacherById(string id)
        {
            var teacher = await _context.Teachers.Include(t => t.Courses).FirstOrDefaultAsync(t => t.Id == id);

            if (teacher == null)
                return NotFound(new { message = "Teacher not found." });

            return Ok(teacher);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTeacher([FromBody] CreateTeacherRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newTeacher = new Teacher
            {
                UserName = request.UserName,
                Role = UserRole.Teacher
                
            };

            var result = await _userManager.CreateAsync(newTeacher, request.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = "Teacher created successfully.", teacherId = newTeacher.Id });
        }

        [HttpPost("bulk")]
        public async Task<IActionResult> CreateTeachers([FromBody] List<CreateTeacherRequest> requests)
        {
            if (requests == null || !requests.Any())
                return BadRequest(new { message = "Request body is empty or no teachers provided." });

            var createdTeachers = new List<string>(); // Список для хранения успешно созданных учителей
            var failedTeachers = new List<string>(); // Список для хранения ошибок создания учителей

            foreach (var request in requests)
            {
                if (!ModelState.IsValid)
                {
                    failedTeachers.Add(request.UserName);
                    continue;
                }

                var newTeacher = new Teacher
                {
                    UserName = request.UserName,
                    Role = UserRole.Teacher
                };

                var result = await _userManager.CreateAsync(newTeacher, request.Password);

                if (result.Succeeded)
                {
                    createdTeachers.Add(newTeacher.Id); // Добавляем ID успешно созданного учителя в список
                }
                else
                {
                    failedTeachers.Add(request.UserName); // Добавляем учителя, создание которого не удалось
                }
            }

            if (failedTeachers.Any())
            {
                return BadRequest(new
                {
                    message = "Some teachers could not be created.",
                    failedTeachers
                });
            }

            return Ok(new
            {
                message = "Teachers created successfully.",
                teacherIds = createdTeachers
            });
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeacher(string id, [FromBody] UpdateTeacherRequest request)
        {
            var teacher = await _context.Teachers.Include(t => t.Courses).FirstOrDefaultAsync(t => t.Id == id);

            if (teacher == null)
                return NotFound(new { message = "Teacher not found." });

            teacher.UserName = request.UserName ?? teacher.UserName;

            _context.Entry(teacher).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Teacher updated successfully.", teacher });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacher(string id)
        {
            var teacher = await _context.Teachers.FindAsync(id);
            if (teacher == null)
                return NotFound(new { message = "Teacher not found." });

            _context.Teachers.Remove(teacher);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Teacher deleted successfully." });
        }
    }
}
