namespace StudentsKnoweledgeAPI.RequestsTemplates
{
    public class AddAnswerRequest
    {
        public IEnumerable<IFormFile> Files { get; set; }
        public string? Comment { get; set; } = ""; 
    }
}