﻿namespace StudentsKnoweledgeAPI.Models
{
    public class TaskMaterial : Material
    {
        public string Description { get; set; }

        public DateTime OpenTime { get; set; }
        public DateTime Deadline { get; set; }
        public double? Grade { get; set; }

        public ICollection<StudentAnswer> Answers { get; set;} = new List<StudentAnswer>();



    }
}
