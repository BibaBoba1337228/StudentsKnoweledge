using Microsoft.AspNetCore.Identity;

namespace StudentsKnoweledgeAPI.Models
{
    public class AppUser : IdentityUser
    {
        public int Id { get; set; }
        public UserRole Role { get; set; }
    }
}

