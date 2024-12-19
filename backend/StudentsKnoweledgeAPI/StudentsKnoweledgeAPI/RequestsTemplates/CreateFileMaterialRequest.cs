namespace StudentsKnoweledgeAPI.RequestsTemplates
{
    public class CreateFileMaterialRequest
    {
        public string Title { get; set; }

        public IEnumerable<IFormFile> Files { get; set; } 
    }
}
