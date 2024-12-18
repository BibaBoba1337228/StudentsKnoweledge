using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GroupController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GroupController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGroups()
        {
            var groups = await _context.Groups.ToListAsync();
            return Ok(groups);
        }


        [HttpGet("paginated")]
        public async Task<IActionResult> GetAllGroupsPaginated([FromQuery] int page, [FromQuery] int limit)
        {
            var totalGroups = await _context.Groups.CountAsync();


            var groups = await _context.Groups
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            var result = new
            {
                TotalCount = totalGroups,
                Data = groups
            };
            return Ok(result);
        }



        [HttpGet("scrolled")]
        public async Task<IActionResult> GetAllGroupsScrollWithSearch([FromQuery] int skip, [FromQuery] int take, [FromQuery] string searchQuery="")
        {
            var query = _context.Groups.AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                query = query.Where(g => g.Name.Contains(searchQuery));
            }
            var groups = await query
                .Skip(skip)
                .Take(take)
                .ToListAsync();

            return Ok(groups);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroupById(int id)
        {
            var group = await _context.Groups.Include(g => g.Students).FirstOrDefaultAsync(g => g.Id == id);

            if (group == null)
                return NotFound(new { message = "Group not found." });

            return Ok(group);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGroup([FromBody] Group group)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Groups.Add(group);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGroupById), new { id = group.Id }, group);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGroup(int id, [FromBody] Group updatedGroup)
        {
            if (id != updatedGroup.Id)
                return BadRequest(new { message = "Group ID mismatch." });

            var group = await _context.Groups.FindAsync(id);
            if (group == null)
                return NotFound(new { message = "Group not found." });

            group.Name = updatedGroup.Name;

            _context.Entry(group).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(group);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroup(int id)
        {
            var group = await _context.Groups.FindAsync(id);
            if (group == null)
                return NotFound(new { message = "Group not found." });

            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Group deleted successfully." });
        }
    }
}
