namespace StudentsKnoweledgeAPI.Models
{
    public class Notification
    {

        public int Id { get; set; } 

        public string UserId { get; set; }

        public StudingUser StudingUser { get; set; }

        public string Url { get; set; }

        public string Text { get; set; }

        public bool isReaded { get; set; } = false;

        public string SenderFio { get; set; }




    }
}
