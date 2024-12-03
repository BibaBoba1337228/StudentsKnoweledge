using Microsoft.AspNetCore.Identity;

namespace StudentsKnoweledgeAPI.Models
{
    public class AppUser : IdentityUser
    {
        public UserRole Role { get; set; }
    }
}

