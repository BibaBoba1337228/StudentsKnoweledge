using StudentsKnoweledgeAPI.Models;

namespace StudentsKnoweledgeAPI.RequestsTemplates
{
    public class CreateUserRequest
    {
        public string UserName { get; set; } // Имя пользователя
        public string Password { get; set; } // Пароль пользователя
        public UserRole Role { get; set; }   // Роль: Student, Teacher, Admin
    }
}
