using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StudingUserController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public StudingUserController(UserManager<AppUser> userManager, AppDbContext context, IHubContext<ChatHub> hubContext, IWebHostEnvironment environment)
        {
            _userManager = userManager;
            _context = context;
            _environment = environment;
        }



        [HttpGet("contacts")]
        public async Task<IActionResult> GetStudingUsers([FromQuery] int skip = 0, [FromQuery] int take = 20, [FromQuery] string search = null)
        {

            IQueryable<StudingUser> query = _context.StudingUsers;

            if (!string.IsNullOrEmpty(search))
            {
                var parts = search.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);

                string lastName = null;
                string firstName = null;
                string middleName = null;

                if (parts.Length > 0)
                {
                    lastName = parts[0].ToLower();
                }
                if (parts.Length > 1)
                {
                    firstName = parts[1].ToLower();
                }
                if (parts.Length > 2)
                {
                    middleName = parts[2].ToLower();
                }

                
                query = query.Where(u =>
                    (lastName == null || u.LastName.ToLower().Contains(lastName)) &&
                    (firstName == null || u.Name.ToLower().Contains(firstName)) &&
                    (middleName == null || u.MiddleName.ToLower().Contains(middleName))
                );
            }


            var users = await query
                .OrderBy(u => u.Id) 
                .Skip(skip)
                .Take(take)
                .ToListAsync();

            var preparedUsers = users.Select(user => new
            {
                id = user.Id,
                name = user.Name,
                middleName = user.MiddleName,
                lastName = user.LastName,
                profilePictureUrl = user.ProfilePictureUrl,
                role = user.Role    
            }).ToList();

            return Ok(preparedUsers);
        }


        [HttpGet("{id}/profile")]
        public async Task<IActionResult> GetStudentProfileById(string id)
        {
            var user = await _context.StudingUsers.FirstOrDefaultAsync(s => s.Id == id);

            if (user == null)
                return NotFound(new { message = "User not found." });
            
            
            if (user.Role == UserRole.Student)
            {
                var student = await _context.Students
                    .Include(s => s.Group)
                    .ThenInclude(g => g.Courses)
                    .FirstOrDefaultAsync(s => s.Id == id);

                if (student == null)
                    return NotFound(new { message = "Student not found" });


                var response = new
                {
                    id = student.Id,
                    mail = student.Mail,
                    groupName = student.Group.Name,

                    courses = student.Group.Courses
                            .Select(course => new
                            {
                                id = course.Id,
                                name = course.Name,
                                semester = course.Semester
                            })
                            .ToList(),

                    name = student.Name,
                    middleName = student.MiddleName,
                    lastName = student.LastName,
                    profilePictureUrl = student.ProfilePictureUrl,
                    phone = student.Phone,
                    role = student.Role
                };
                return Ok(response);
            }
            else if (user.Role == UserRole.Teacher)
            {
                var teacher = await _context.Teachers
                    .Include(t => t.Courses)
                    .FirstOrDefaultAsync(t => t.Id == id);

                if (teacher == null)
                    return NotFound(new { message = "Teacher not found" });

                var response = new
                {
                    id = teacher.Id,
                    mail = teacher.Mail,
                    courses = teacher.Courses
                        .Select(course => new
                            {
                                id = course.Id,
                                name = course.Name,
                                semester = course.Semester
                            })
                        .ToList(),
                    name = teacher.Name,
                    middleName = teacher.MiddleName,
                    lastName = teacher.LastName,
                    profilePictureUrl = teacher.ProfilePictureUrl,
                    phone = teacher.Phone,
                    role = teacher.Role
                };
                return Ok(response);
            }


            return NotFound(new { message = "User not found." });

        }



        [HttpGet("{id}/marks")]
        public async Task<IActionResult> GetMyMarks(string id)
        {
            var user = await _context.StudingUsers.FirstOrDefaultAsync(s => s.Id == id);

            if (user == null)
                return NotFound(new { message = "User not found." });


            if (user.Role == UserRole.Student)
            {
                var student = await _context.Students
                    .Include(s => s.Group)
                    .ThenInclude(g => g.Courses)
                    .FirstOrDefaultAsync(s => s.Id == id);

                if (student == null)
                    return NotFound(new { message = "Student not found" });


                var response = new
                {
                    id = student.Id,
                    mail = student.Mail,
                    groupName = student.Group.Name,

                    courses = student.Group.Courses
                            .Select(course => new
                            {
                                id = course.Id,
                                name = course.Name,
                                semester = course.Semester
                            })
                            .ToList(),

                    name = student.Name,
                    middleName = student.MiddleName,
                    lastName = student.LastName,
                    profilePictureUrl = student.ProfilePictureUrl,
                    phone = student.Phone,
                    role = student.Role
                };
                return Ok(response);
            }
            else if (user.Role == UserRole.Teacher)
            {
                var teacher = await _context.Teachers
                    .Include(t => t.Courses)
                    .FirstOrDefaultAsync(t => t.Id == id);

                if (teacher == null)
                    return NotFound(new { message = "Teacher not found" });

                var response = new
                {
                    id = teacher.Id,
                    mail = teacher.Mail,
                    courses = teacher.Courses
                        .Select(course => new
                        {
                            id = course.Id,
                            name = course.Name,
                            semester = course.Semester
                        })
                        .ToList(),
                    name = teacher.Name,
                    middleName = teacher.MiddleName,
                    lastName = teacher.LastName,
                    profilePictureUrl = teacher.ProfilePictureUrl,
                    phone = teacher.Phone,
                    role = teacher.Role
                };
                return Ok(response);
            }


            return NotFound(new { message = "User not found." });

        }


        [HttpPut("updateProfilePicture")]
        public async Task<IActionResult> UpdateProfilePicture(IFormFile profilePicture)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (profilePicture == null || profilePicture.Length == 0)
            {
                return BadRequest(new { message = "No file provided" });
            }

            try
            {
                // Генерация уникального имени файла
                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(profilePicture.FileName)}";

                // Используем директорию для хранения файлов в проекте (например, в папке "files")
                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "files", "profile_pictures", userId);

                // Проверяем, существует ли директория, и создаем, если нет
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                var filePath = Path.Combine(uploadPath, fileName);

                // Сохранение файла
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await profilePicture.CopyToAsync(stream);
                }

                // Обновление пути к файлу в базе данных
                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                    return NotFound(new { message = "User not found" });

                user.ProfilePictureUrl = Path.Combine("profile_pictures", userId, fileName).Replace("\\", "/"); // URL для доступа
                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(new {profilePictureUrl = user.ProfilePictureUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }





    }
}
