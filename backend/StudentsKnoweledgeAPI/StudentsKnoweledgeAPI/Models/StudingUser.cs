using System.ComponentModel.DataAnnotations;

namespace StudentsKnoweledgeAPI.Models
{
    public class StudingUser : AppUser
    {
        [EmailAddress(ErrorMessage = "Неверный формат email")]
        public string Mail { get; set; }
        public string Name { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }


        public string Phone { get; set; }


        public ICollection<Chat> Chats { get; set; } = new List<Chat>();

        public ICollection<Notification> Notifications { get; set; } = new List<Notification>();


    }
}
