using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministratorController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AppDbContext _context;

        public AdministratorController(UserManager<AppUser> userManager, AppDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAdministrators()
        {
            var administrators = await _context.Administrators.ToListAsync();
            return Ok(administrators);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAdministratorById(int id)
        {
            var administrator = await _context.Administrators.FindAsync(id);

            if (administrator == null)
                return NotFound(new { message = "Administrator not found." });

            return Ok(administrator);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAdministrator([FromBody] CreateAdministratorRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newAdministrator = new Administrator
            {
                UserName = request.UserName,
                Role = UserRole.Admin
            };

            var result = await _userManager.CreateAsync(newAdministrator, request.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = "Administrator created successfully.", administratorId = newAdministrator.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAdministrator(int id, [FromBody] UpdateAdministratorRequest request)
        {
            var administrator = await _context.Administrators.FindAsync(id);

            if (administrator == null)
                return NotFound(new { message = "Administrator not found." });

            administrator.UserName = request.UserName ?? administrator.UserName;

            _context.Entry(administrator).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Administrator updated successfully.", administrator });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdministrator(int id)
        {
            var administrator = await _context.Administrators.FindAsync(id);
            if (administrator == null)
                return NotFound(new { message = "Administrator not found." });

            _context.Administrators.Remove(administrator);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Administrator deleted successfully." });
        }
    }

    

    
}
