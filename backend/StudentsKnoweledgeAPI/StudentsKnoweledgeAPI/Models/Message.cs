namespace StudentsKnoweledgeAPI.Models
{
    public class Message
    {

        public int Id { get; set; }

        public string Text { get; set; }

        public string SenderId { get; set; }

        public DateTime SendDate { get; set; } = DateTime.Now;

        public bool IsReaded { get; set; } = false;

        public int ChatId { get; set; }

        public StudingUser Sender { get; set; }

        public Chat Chat { get; set; }


    }
}
