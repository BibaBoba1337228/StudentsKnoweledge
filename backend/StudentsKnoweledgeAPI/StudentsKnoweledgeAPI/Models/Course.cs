using System.ComponentModel.DataAnnotations;

namespace StudentsKnoweledgeAPI.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        [Range(1, 12, ErrorMessage = "Semester must be between 1 and 12.")]
        public int Semester { get; set; } = 1;

        public ICollection<Group> Groups { get; set; } = new List<Group>();
        public ICollection<Teacher> Teachers { get; set; } = new List<Teacher>();
        public ICollection<Section> Sections { get; set; } = new List<Section>();
    }
}
