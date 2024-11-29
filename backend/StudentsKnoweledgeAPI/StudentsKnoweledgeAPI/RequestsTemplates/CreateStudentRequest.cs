namespace StudentsKnoweledgeAPI.RequestsTemplates
{
    public class CreateStudentRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public int GroupId { get; set; }
    }
}