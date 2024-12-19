namespace StudentsKnoweledgeAPI.RequestsTemplates.DTO
{
    public class ScheduleDto
    {
        public int GroupId { get; set; }
        public List<ScheduleEntryDto> Entries { get; set; }
    }

    public class ScheduleEntryDto
    {
        public string Subject { get; set; }
        public string Classroom { get; set; }
        public string StartTime { get; set; }  // В формате "HH:mm:ss"
        public string EndTime { get; set; }    // В формате "HH:mm:ss"
        public string Day { get; set; }        // Например, "Monday", "Tuesday"
        public bool IsNumerator { get; set; }
        public bool IsDenominator { get; set; }
    }

}
