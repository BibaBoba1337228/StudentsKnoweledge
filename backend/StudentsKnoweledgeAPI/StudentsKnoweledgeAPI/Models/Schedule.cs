using System.ComponentModel.DataAnnotations;

namespace StudentsKnoweledgeAPI.Models
{
    public class Schedule
    {
        public int Id { get; set; }

        public int GroupId { get; set; }
        public Group Group { get; set; }


        public ICollection<ScheduleEntry> Entries { get; set; } = new List<ScheduleEntry>();

    }
}
