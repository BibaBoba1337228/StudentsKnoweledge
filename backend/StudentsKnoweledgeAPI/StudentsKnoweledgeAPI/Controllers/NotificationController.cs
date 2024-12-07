using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AppDbContext _context;

        public NotificationController(UserManager<AppUser> userManager, AppDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        // Получение всех уведомлений
        [HttpGet]
        public async Task<IActionResult> GetAllNotifications()
        {
            var notifications = await _context.Notifications.Include(n => n.StudingUser).ToListAsync();
            return Ok(notifications);
        }

        // Получение уведомлений пользователя по UserId
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetNotificationsByUserId(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound(new { message = "User not found." });

            var notifications = await _context.Notifications
                .Include(n => n.StudingUser)
                .Where(n => n.UserId == userId)
                .ToListAsync();

            if (!notifications.Any())
                return NotFound(new { message = "No notifications found for the user." });

            return Ok(notifications);
        }

        // Получение уведомления по ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNotificationById(int id)
        {
            var notification = await _context.Notifications.Include(n => n.StudingUser).FirstOrDefaultAsync(n => n.Id == id);

            if (notification == null)
                return NotFound(new { message = "Notification not found." });

            return Ok(notification);
        }

        // Создание уведомления
        [HttpPost]
        public async Task<IActionResult> CreateNotification([FromBody] Notification newNotification)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByIdAsync(newNotification.UserId);
            if (user == null)
                return BadRequest(new { message = "User not found." });

            newNotification.StudingUser = user as StudingUser;

            await _context.Notifications.AddAsync(newNotification);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNotificationById), new { id = newNotification.Id }, newNotification);
        }

        // Обновление уведомления
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNotification(int id, [FromBody] Notification updatedNotification)
        {
            var notification = await _context.Notifications.FindAsync(id);

            if (notification == null)
                return NotFound(new { message = "Notification not found." });

            notification.Url = updatedNotification.Url ?? notification.Url;
            notification.Text = updatedNotification.Text ?? notification.Text;

            _context.Entry(notification).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(notification);
        }

        // Удаление уведомления
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);

            if (notification == null)
                return NotFound(new { message = "Notification not found." });

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Notification deleted successfully." });
        }
    }
}
