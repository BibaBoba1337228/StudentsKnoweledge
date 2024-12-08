namespace StudentsKnoweledgeAPI.RequestsTemplates
{
    public class CreateEventRequest
    {
        public int CourseId { get; set; }  // ID курса
        public DateTime OpenDate { get; set; }  // Дата открытия
        public DateTime CloseDate { get; set; }  // Дата закрытия
        public int MaterialId { get; set; }  // ID материала
    }
}
