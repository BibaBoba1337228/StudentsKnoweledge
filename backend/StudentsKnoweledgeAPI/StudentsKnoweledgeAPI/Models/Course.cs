namespace StudentsKnoweledgeAPI.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public ICollection<Group> Groups { get; set; } = new List<Group>();
        public ICollection<Teacher> Teachers { get; set; } = new List<Teacher>();
        public ICollection<Section> Sections { get; set; } = new List<Section>();
    }
}
