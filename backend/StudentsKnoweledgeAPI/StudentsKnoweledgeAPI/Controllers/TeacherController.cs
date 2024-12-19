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
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllTeachers()
        {
            var teachers = await _context.Teachers.Include(t => t.Courses).ToListAsync();
            return Ok(teachers);
        }

        [HttpGet("paginated")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetTeachersPaginated([FromQuery] int page, [FromQuery] int limit)
        {


            var totalTeachers = await _context.Teachers.CountAsync();


            var teachers = await _context.Teachers
                .Skip((page - 1) * limit)
                .Take(limit)
                .Include(t => t.Courses)
                .ToListAsync();

            var preparedTeachers = teachers.Select(teacher =>
            new
            {
                id = teacher.Id,
                userName = teacher.UserName,
                name = teacher.Name,
                lastName = teacher.LastName,
                middleName = teacher.MiddleName,
                phone = teacher.Phone,
                mail = teacher.Mail,

            }).ToList();

            var result = new
            {
                TotalCount = totalTeachers,
                Data = preparedTeachers
            };
            return Ok(result);
        }

        [HttpGet("scrolled")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetTeachersScrollWithSearch([FromQuery] int skip, [FromQuery] int take, [FromQuery] string searchQuery = "")
        {
            var query = _context.Teachers.AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                query = query.Where(g => g.LastName.Contains(searchQuery));
            }
            var teachers = await query
                .Skip(skip)
                .Take(take)
                .ToListAsync();

            var preparedTeachers = teachers.Select(teacher => new
            {
                profilePictureUrl = teacher.ProfilePictureUrl,
                middleName = teacher.MiddleName,
                name = teacher.Name,
                lastName = teacher.LastName,
                id = teacher.Id

            }).ToList();
            return Ok(preparedTeachers);
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
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateTeacher([FromBody] CreateTeacherRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Создаем нового учителя
            var newTeacher = new Teacher
            {
                UserName = request.UserName,
                Mail = request.Mail,
                Name = request.Name,
                LastName = request.LastName,
                MiddleName = request.MiddleName,
                Phone = request.Phone,
                Role = UserRole.Teacher
            };

            var result = await _userManager.CreateAsync(newTeacher, request.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            // Возвращаем созданного учителя
            return Ok(newTeacher);
        }

        [HttpPost("bulk")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateTeachers([FromBody] List<CreateTeacherRequest> requests)
        {
            if (requests == null || !requests.Any())
                return BadRequest(new { message = "Request body is empty or no teachers provided." });

            var createdTeachers = new List<string>();
            var failedTeachers = new List<string>(); 

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
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateTeacher(string id, [FromBody] UpdateTeacherRequest request)
        {
            var teacher = await _context.Teachers.Include(t => t.Courses)
                                                   .FirstOrDefaultAsync(t => t.Id == id);

            if (teacher == null)
                return NotFound(new { message = "Teacher not found." });

            // Обновляем обычные поля
            teacher.UserName = request.UserName ?? teacher.UserName;
            teacher.Mail = request.Mail ?? teacher.Mail;
            teacher.Name = request.Name ?? teacher.Name;
            teacher.LastName = request.LastName ?? teacher.LastName;
            teacher.MiddleName = request.MiddleName ?? teacher.MiddleName;
            teacher.Phone = request.Phone ?? teacher.Phone;

            // Если передан новый пароль, обновляем его через UserManager
            if (!string.IsNullOrEmpty(request.Password))
            {
                var user = await _userManager.FindByIdAsync(teacher.Id); // Найти пользователя по Id



                if (user == null)
                    return NotFound(new { message = "User not found." });

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                var result = await _userManager.ResetPasswordAsync(user, token, request.Password);


                if (!result.Succeeded)
                {
                    return BadRequest(new { message = "Failed to change password.", errors = result.Errors });
                }

            }

            // Обновляем сущность преподавателя
            _context.Entry(teacher).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(teacher);
        }




        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
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
