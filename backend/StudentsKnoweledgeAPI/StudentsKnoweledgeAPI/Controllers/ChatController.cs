using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;
using Azure.Core;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ChatController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AppDbContext _context;
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(UserManager<AppUser> userManager, AppDbContext context, IHubContext<ChatHub> hubContext)
        {
            _userManager = userManager;
            _context = context;
            _hubContext = hubContext;
        }

        // Получить все чаты пользователя
        [HttpGet]
        public async Task<IActionResult> GetAllChats()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            var chats = await _context.Chats
                .Include(c => c.Messages)
                .Where(c => c.User1Id == userId || c.User2Id == userId)
                .ToListAsync();


            var chatsPrepared = chats.Select(c =>
            {
                var otherUserId = c.User1Id == userId? c.User2Id : c.User1Id;
                var otherUser = _context.StudingUsers.FirstOrDefault((u) => u.Id == otherUserId);

                var lastMessage = c.Messages
                    .OrderByDescending(m => m.SendDate)
                    .FirstOrDefault();

                return new
                {
                    Id = c.Id,
                    Interlocutor = otherUser == null? null : new {
                        Id = otherUser.Id,
                        Fio = $"{otherUser.LastName} {otherUser.Name[0]}. {otherUser.MiddleName[0]}.",
                        photo = otherUser.ProfilePictureUrl,
                    },
                    LastMessage = lastMessage
                };
            }).ToList();

            return Ok(chatsPrepared);
        }

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetChatByUserId(string id)
        {

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            var interlocutor = await _context.StudingUsers.FirstOrDefaultAsync(u => u.Id == id);
            if (interlocutor == null)
                return NotFound("User not found");

            var chat = await _context.Chats
                .Include(c => c.Messages)
                .Where(c => (c.User1Id == userId && c.User2Id == id) || (c.User1Id == id && c.User2Id == userId))
                .FirstOrDefaultAsync();

            if (chat == null)
            {
                chat = new Chat
                {
                    User1Id = userId,
                    User2Id = id
                };

                _context.Chats.Add(chat);
                await _context.SaveChangesAsync();
            }


            var preparedChat = new
            {
                id = chat.Id,
            };

            return Ok(preparedChat);
        }

        // Получить чат по ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetChatById(int id, [FromQuery] int take = 20)
        {

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            var chat = await _context.Chats
                .FirstOrDefaultAsync(c => c.Id == id);

            if (chat == null)
                return NotFound(new { message = "Chat not found." });
                
            if (!(chat.User1Id == userId || chat.User2Id == userId))
            {
                return NotFound(new { message = "Chat not found." });
            }

            var messages = await _context.Messages
                .Where(m => m.ChatId == id)
                .OrderByDescending(m => m.SendDate)
                .Take(take)
                .ToListAsync();

            var otherUserId = chat.User1Id == userId ? chat.User2Id : chat.User1Id;
            var otherUser = _context.StudingUsers.FirstOrDefault((u) => u.Id == otherUserId);

            var preparedChat = new
            {
                id = chat.Id,
                interlocutor = otherUser == null ? null : new
                {
                    Id = otherUser.Id,
                    Fio = $"{otherUser.LastName} {otherUser.Name[0]}. {otherUser.MiddleName[0]}."
                },
                messages = chat.Messages
            };

            return Ok(preparedChat);
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
                User2Id = request.User2Id
            };

            _context.Chats.Add(chat);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetChatById), new { id = chat.Id }, chat);
        }

        // Удалить чат
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChat(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            var chat = await _context.Chats.FirstOrDefaultAsync(c => c.Id == id);
            

            if (chat == null)
                return NotFound(new { message = "Chat not found." });

            if (!(chat.User1Id == userId || chat.User2Id == userId))
            {
                return NotFound(new { message = "Chat not found." });
            }

            _context.Chats.Remove(chat);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Chat deleted successfully." });
        }

        // Получить сообщения чата с пагинацией
        [HttpGet("{chatId}/messages")]
        public async Task<IActionResult> GetMessagesByChatId(int chatId, [FromQuery] int skip = 0, [FromQuery] int take = 20)
        {
            var messages = await _context.Messages
                .Where(m => m.ChatId == chatId)
                .OrderByDescending(m => m.SendDate)
                .Skip(skip)
                .Take(take)
                .ToListAsync();

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
                SendDate = DateTime.UtcNow
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            await _hubContext.Clients.Group(chatId.ToString()).SendAsync("ReceiveMessage", new
            {
                Id = message.Id,
                Text = message.Text,
                SenderId = message.SenderId,
                SendDate = message.SendDate
            });

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
