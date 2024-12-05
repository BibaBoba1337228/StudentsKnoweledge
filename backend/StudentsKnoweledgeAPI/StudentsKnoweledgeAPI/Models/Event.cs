﻿namespace StudentsKnoweledgeAPI.Models
{
    public class Event
    {

        public int Id { get; set; }

       public int CourseId { get; set; }

       public Course Course { get; set;}

       public DateTime OpenDate { get; set; }

       public DateTime CloseDate { get; set; } 

       public int MaterialId { get; set; }

       public TaskMaterial Material { get; set; }

    }
}