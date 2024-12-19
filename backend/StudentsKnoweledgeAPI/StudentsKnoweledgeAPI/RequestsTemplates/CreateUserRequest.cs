using StudentsKnoweledgeAPI.Models;

namespace StudentsKnoweledgeAPI.RequestsTemplates
{
    public class CreateUserRequest
    {
        public string UserName { get; set; } 
        public string Password { get; set; } 
        public UserRole Role { get; set; }   
    }
}
