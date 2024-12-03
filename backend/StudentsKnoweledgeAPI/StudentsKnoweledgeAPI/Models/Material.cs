using System.ComponentModel.DataAnnotations.Schema;

namespace StudentsKnoweledgeAPI.Models
{
    public class Material
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;

        public int SectionId { get; set; }
        public Section Section { get; set; }


        public string Type { get; set; }
    }
}
