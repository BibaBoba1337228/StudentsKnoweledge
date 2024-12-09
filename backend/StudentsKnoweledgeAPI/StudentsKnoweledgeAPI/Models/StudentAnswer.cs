namespace StudentsKnoweledgeAPI.Models
{
    public class StudentAnswer
    {
        public int Id { get; set; }

        public string StudentId { get; set; }

        public Student Student { get; set; }

        public int MaterialId { get; set; }

        public TaskMaterial Material { get; set; }

        public string FilePath { get; set; }

        public int Grade { get; set; }

        public DateTime AnswerTime { get; set; }

        public DateTime MarkTime { get; set; }


        public string TeacherId { get; set; } = "";

        public string TeacherFIO { get; set; } = "";

        public string Comment { get; set; } = "";

        public string TeacherComment { get; set; } = "";



        
    }
}
