﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentsKnoweledgeAPI.Models
{
    public class ScheduleEntry
    {
        public int Id { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Classroom { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        [Required]
        public string Day { get; set; }

        public int ScheduleId { get; set; }  // Explicit foreign key for Schedule
        public Schedule Schedule { get; set; }  // Navigation property for Schedule


        // Поля для деления на числитель и знаменатель
        public bool IsNumerator { get; set; } = false;  // Это может быть признак для числителя
        public bool IsDenominator { get; set; } = false;  // Это может быть признак для знаменателя
    }
}