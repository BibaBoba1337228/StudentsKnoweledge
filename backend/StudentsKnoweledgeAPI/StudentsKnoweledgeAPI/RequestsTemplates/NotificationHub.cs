using Microsoft.AspNetCore.SignalR;




namespace StudentsKnoweledgeAPI.RequestsTemplates
{
    public class NotificationHub : Hub
    {
        public async Task SendNotification(string userId, string notification)
        {
            await Clients.User(userId).SendAsync("ReceiveNotification", notification);
        }
    }

}
