using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StudentsKnoweledgeAPI.Models;
namespace StudentsKnoweledgeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController: ControllerBase
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;

        public LoginController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] RequestsTemplates.LoginRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByNameAsync(request.Username);

            if (user == null)
                return Unauthorized(new { message = "Invalid username or password." });

            var result = await _signInManager.PasswordSignInAsync(user.UserName, request.Password, isPersistent: false, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                return Ok(new { message = "Login successful." });
            }

            return Unauthorized(new { message = "Invalid username or password." });
        }

        [HttpGet("status")]
        public IActionResult Status()
        {
            if (User.Identity == null || !User.Identity.IsAuthenticated)
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            return Ok(new
            {
                message = "User is authenticated.",
                username = User.Identity.Name, // Имя пользователя
                claims = User.Claims.Select(c => new { c.Type, c.Value }) // Все утверждения (claims)
            });
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { message = "Logout successful." });
        }
    }
}
