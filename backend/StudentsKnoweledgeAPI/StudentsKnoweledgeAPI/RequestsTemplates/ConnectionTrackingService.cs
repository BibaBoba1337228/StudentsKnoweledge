using System.Collections.Concurrent;

namespace StudentsKnoweledgeAPI.RequestsTemplates
{
    public interface IConnectionTrackingService
    {
        void AddConnection(string chatId);
        void RemoveConnection(string chatId);
        int GetConnectedClientsCount(string chatId);
    }

    public class ConnectionTrackingService : IConnectionTrackingService
    {
        private readonly ConcurrentDictionary<string, int> _groupConnections = new ConcurrentDictionary<string, int>();

        public void AddConnection(string chatId)
        {
            _groupConnections.AddOrUpdate(chatId, 1, (key, oldValue) => oldValue + 1);
        }

        public void RemoveConnection(string chatId)
        {
            _groupConnections.AddOrUpdate(chatId, 0, (key, oldValue) => Math.Max(0, oldValue - 1));
        }

        public int GetConnectedClientsCount(string chatId)
        {
            _groupConnections.TryGetValue(chatId, out int count);
            return count;
        }
    }

}
