using System;

namespace StudentsKnoweledgeAPI.Models
{
    public class Student : StudingUser
    {
        public int GroupId { get; set; } 
        public Group Group { get; set; } 
    }
}
