﻿namespace StudentsKnoweledgeAPI.Models
{
    public class StudingUser : AppUser
    {
        public string Mail { get; set; }
        public string Name { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
    }
}