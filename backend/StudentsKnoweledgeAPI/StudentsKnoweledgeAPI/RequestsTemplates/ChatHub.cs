using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

public class ChatHub : Hub
{
    private static readonly ConcurrentDictionary<string, int> _connections = new ConcurrentDictionary<string, int>();

    public override async Task OnConnectedAsync()
    {
        var chatId = Context.GetHttpContext().Request.Query["chatId"];
        if (!string.IsNullOrEmpty(chatId))
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chatId);

            _connections.AddOrUpdate(chatId, 1, (key, oldValue) => oldValue + 1);
        }

        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        var chatId = Context.GetHttpContext().Request.Query["chatId"];
        if (!string.IsNullOrEmpty(chatId))
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, chatId);

            _connections.AddOrUpdate(chatId, 0, (key, oldValue) => Math.Max(0, oldValue - 1));
        }

        await base.OnDisconnectedAsync(exception);
    }

    public static int GetConnectedClientsCount(string chatId)
    {
        _connections.TryGetValue(chatId, out int count);
        return count;
    }

    public async Task SendMessage(string chatId, string message)
    {
        await Clients.Group(chatId).SendAsync("ReceiveMessage", message);
    }
}
