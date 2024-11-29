using System.ComponentModel.DataAnnotations;

namespace StudentsKnoweledgeAPI.RequestsTemplates
{
    public class LoginRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; } 
    }
}
