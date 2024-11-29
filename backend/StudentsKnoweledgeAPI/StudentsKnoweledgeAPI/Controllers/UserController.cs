using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {


        private readonly UserManager<AppUser> _userManager;

        public UserController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }


   

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            AppUser newUser;

            // Определяем тип пользователя
            switch (request.Role)
            {
                case UserRole.Student:
                    newUser = new Student
                    {
                        UserName = request.UserName,
                        Role = UserRole.Student
                    };
                    break;

                case UserRole.Teacher:
                    newUser = new Teacher
                    {
                        UserName = request.UserName,
                        Role = UserRole.Teacher
                    };
                    break;

                case UserRole.Admin:
                    newUser = new Administrator
                    {
                        UserName = request.UserName,
                        Role = UserRole.Admin
                    };
                    break;

                default:
                    return BadRequest(new { message = "Invalid role specified." });
            }

            // Создаём пользователя
            var result = await _userManager.CreateAsync(newUser, request.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = "User created successfully.", userId = newUser.Id });
        }
    }
}
