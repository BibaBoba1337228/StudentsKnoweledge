﻿namespace StudentsKnoweledgeAPI.RequestsTemplates
{
    public class CreateTaskMaterialRequest
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime? Deadline { get; set; }
        public double? Grade { get; set; }
    }
}
