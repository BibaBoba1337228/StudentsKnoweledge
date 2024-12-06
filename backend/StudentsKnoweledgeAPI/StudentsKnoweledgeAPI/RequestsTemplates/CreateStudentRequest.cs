namespace StudentsKnoweledgeAPI.RequestsTemplates
{
    public class CreateStudentRequest
    {
        public string UserName { get; set; }
        public string Mail { get; set; }  
        public string Name { get; set; }  
        public string LastName { get; set; }  
        public string MiddleName { get; set; }  
        public string Phone { get; set; } 
        public string Password { get; set; }
        public int GroupId { get; set; }
    }
}
