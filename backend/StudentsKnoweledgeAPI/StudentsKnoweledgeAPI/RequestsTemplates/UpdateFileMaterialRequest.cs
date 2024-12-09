namespace StudentsKnoweledgeAPI.RequestsTemplates
{
    public class UpdateFileMaterialRequest {

        public string? Title { get; set; }

        public IEnumerable<IFormFile>? Files { get; set; } // Поддержка множественной загрузки файлов
    }

}

