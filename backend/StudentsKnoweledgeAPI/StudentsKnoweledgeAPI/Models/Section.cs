namespace StudentsKnoweledgeAPI.Models
{
    public class Section
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public int CourseId { get; set; }
        public Course Course { get; set; }

        public ICollection<Material> Materials { get; set; } = new List<Material>();
    }
}
