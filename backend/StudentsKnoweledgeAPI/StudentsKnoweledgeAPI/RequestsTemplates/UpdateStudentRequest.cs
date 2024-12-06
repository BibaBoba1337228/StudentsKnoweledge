using System.ComponentModel.DataAnnotations;

namespace StudentsKnoweledgeAPI.RequestsTemplates
{
    public class UpdateStudentRequest
    {
        [Required]
        public string? UserName { get; set; }
        [EmailAddress(ErrorMessage = "Неверный формат email")]
        [Required]
        public string? Mail { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? LastName { get; set; }
        [Required]

        public string? MiddleName { get; set; }

        [Required]
        public string? Phone { get; set; }
        public string? Password { get; set; }

        [Required]
        public int? GroupId { get; set; }
    }
}
