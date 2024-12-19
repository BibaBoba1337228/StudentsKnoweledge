namespace StudentsKnoweledgeAPI.RequestsTemplates
{
    public class CreateEventRequest
    {
        public int CourseId { get; set; }  
        public DateTime OpenDate { get; set; }  
        public DateTime CloseDate { get; set; }  
        public int MaterialId { get; set; }  
    }
}
