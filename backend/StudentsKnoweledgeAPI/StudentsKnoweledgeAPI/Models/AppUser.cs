using Microsoft.AspNetCore.Identity;

namespace StudentsKnoweledgeAPI.Models
{
    public class AppUser : IdentityUser
    {
        public UserRole Role { get; set; }

        public string ProfilePictureUrl { get; set; } = "files/UserProfilePictures/default.svg";
    }
}

