using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AppDbContext _context;

        public ChatController(UserManager<AppUser> userManager, AppDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        // Получить все чаты
        [HttpGet]
        public async Task<IActionResult> GetAllChats()
        {
            var chats = await _context.Chats
                .Include(c => c.Users)
                .Include(c => c.Messages)
                .ToListAsync();
            return Ok(chats);
        }

        // Получить чат по ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetChatById(int id)
        {
            var chat = await _context.Chats
                .Include(c => c.Users)
                .Include(c => c.Messages)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (chat == null)
                return NotFound(new { message = "Chat not found." });

            return Ok(chat);
        }

        // Создать новый чат
        [HttpPost]
        public async Task<IActionResult> CreateChat([FromBody] CreateChatRequest request)
        {
            var user1 = await _userManager.FindByIdAsync(request.User1Id);
            var user2 = await _userManager.FindByIdAsync(request.User2Id);

            if (user1 == null || user2 == null)
                return BadRequest(new { message = "One or both users not found." });

            var chat = new Chat
            {
                User1Id = request.User1Id,
                User2Id = request.User2Id,
                Users = new List<StudingUser> { user1 as StudingUser, user2 as StudingUser }
            };

            _context.Chats.Add(chat);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetChatById), new { id = chat.Id }, chat);
        }

        // Удалить чат
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChat(int id)
        {
            var chat = await _context.Chats.FindAsync(id);

            if (chat == null)
                return NotFound(new { message = "Chat not found." });

            _context.Chats.Remove(chat);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Chat deleted successfully." });
        }

        // Получить сообщения чата
        [HttpGet("{chatId}/messages")]
        public async Task<IActionResult> GetMessagesByChatId(int chatId)
        {
            var messages = await _context.Messages
                .Where(m => m.ChatId == chatId)
                .OrderBy(m => m.SendDate)
                .ToListAsync();

            if (!messages.Any())
                return NotFound(new { message = "No messages found for this chat." });

            return Ok(messages);
        }

        // Отправить сообщение в чат
        [HttpPost("{chatId}/messages")]
        public async Task<IActionResult> SendMessage(int chatId, [FromBody] SendMessageRequest request)
        {
            var chat = await _context.Chats.FindAsync(chatId);
            if (chat == null)
                return NotFound(new { message = "Chat not found." });

            var sender = await _userManager.FindByIdAsync(request.SenderId);
            if (sender == null)
                return BadRequest(new { message = "Sender not found." });

            var message = new Message
            {
                ChatId = chatId,
                Text = request.Text,
                SenderId = request.SenderId,
                Sender = sender as StudingUser
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(message);
        }

        // Пометить сообщение как прочитанное
        [HttpPut("messages/{messageId}/read")]
        public async Task<IActionResult> MarkMessageAsRead(int messageId)
        {
            var message = await _context.Messages.FindAsync(messageId);

            if (message == null)
                return NotFound(new { message = "Message not found." });

            message.IsReaded = true;
            _context.Entry(message).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Message marked as read." });
        }

        // Удалить сообщение
        [HttpDelete("messages/{messageId}")]
        public async Task<IActionResult> DeleteMessage(int messageId)
        {
            var message = await _context.Messages.FindAsync(messageId);

            if (message == null)
                return NotFound(new { message = "Message not found." });

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Message deleted successfully." });
        }
    }


}
