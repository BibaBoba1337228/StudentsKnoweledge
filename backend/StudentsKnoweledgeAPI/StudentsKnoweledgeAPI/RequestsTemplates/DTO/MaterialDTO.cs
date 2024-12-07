namespace StudentsKnoweledgeAPI.RequestsTemplates.DTO
{
    public class MaterialDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsVisible { get; set; }
        public string Type { get; set; }
    }

    public class FileMaterialDto : MaterialDto
    {
        public string FilePath { get; set; }
    }

    public class TaskMaterialDto : MaterialDto
    {
        public string Description { get; set; }
        public DateTime OpenTime { get; set; }
        public DateTime Deadline { get; set; }
        public double? Grade { get; set; }
    }

    public class TextContentMaterialDto : MaterialDto
    {
        public string Content { get; set; }
    }
}
