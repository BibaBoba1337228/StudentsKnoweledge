using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;
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

        public StudingUserController(UserManager<AppUser> userManager, AppDbContext context, IHubContext<ChatHub> hubContext)
        {
            _userManager = userManager;
            _context = context;
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
    }
}
