namespace StudentsKnoweledgeAPI.Models
{
    public class Teacher : StudingUser
    {
        public ICollection<Course> Courses { get; set; } = new List<Course>();
    }
}
