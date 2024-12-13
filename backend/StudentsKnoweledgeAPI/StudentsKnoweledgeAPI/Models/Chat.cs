namespace StudentsKnoweledgeAPI.Models
{
    public class Chat
    {

        public int Id { get; set; }

        public string User1Id { get; set; }

        public string User2Id { get; set;}

        public ICollection<Message> Messages { get; set; } = new List<Message>();

    }
}
