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

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { message = "Logout successful." });
        }
    }
}
