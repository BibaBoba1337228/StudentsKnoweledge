using Microsoft.AspNetCore.Identity;

namespace StudentsKnoweledgeAPI.Models
{
    public class AppUser : IdentityUser
    {
        public int Id { get; set; }
        public string PasswordHash { get; set; } = string.Empty;
        public UserRole Role { get; set; }
    }
}

