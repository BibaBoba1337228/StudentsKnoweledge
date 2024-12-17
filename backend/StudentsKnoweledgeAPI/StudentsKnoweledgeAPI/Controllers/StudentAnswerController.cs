using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/Materials/{materialId}/[controller]")]
    [ApiController]
    [Authorize]
    public class StudentAnswersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public StudentAnswersController(AppDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // Получение всех ответов пользователей по ID материала
        [HttpGet]
        public async Task<IActionResult> GetAnswersByMaterialId(int materialId)
        {
            var answers = await _context.StudentAnswers
                .Where(a => a.MaterialId == materialId)
                .Include(a => a.Student)
                .ToListAsync();

            if (!answers.Any())
                return NotFound(new { message = "No answers found for this material." });

            return Ok(answers);
        }

        [HttpGet("{studentId}/courses/{courseId}")]
        public async Task<IActionResult> GetAnswersByStudentAndCourse(string studentId, int courseId)
        {
            var answers = await _context.StudentAnswers
                .Where(answer => answer.StudentId == studentId &&
                                 answer.Material.Section.CourseId == courseId) // Используем courseId из маршрута
                .Include(answer => answer.Material) // Подгружаем материал
                .ToListAsync();

            if (!answers.Any())
                return NotFound(new { message = "No answers found for the specified course and student." });

            return Ok(answers);
        }


        // Получение ответа по ID материала и ID студента
        [HttpGet("{studentId}")]
        public async Task<IActionResult> GetAnswerByMaterialAndStudent(int materialId, string studentId)
        {
            var answer = await _context.StudentAnswers
                .FirstOrDefaultAsync(a => a.MaterialId == materialId && a.StudentId == studentId);

            if (answer == null)
                return NotFound(new { message = "Answer not found." });

            return Ok(answer);
        }

        [HttpPost]
        public async Task<IActionResult> AddAnswer(int materialId, [FromForm] AddAnswerRequest request)
        {
            var studentId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (request.Files == null || !request.Files.Any())
                return BadRequest(new { message = "No files provided" });

            var filePaths = new List<string>();

            foreach (var file in request.Files)
            {
                if (file.Length == 0)
                    continue;

                var filePath = Path.Combine("files", studentId, file.FileName);
                Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                filePaths.Add(filePath);
            }

            var answer = new StudentAnswer
            {
                MaterialId = materialId, // Теперь берем materialId из маршрута
                StudentId = studentId,   // Берем studentId из маршрута
                FilePath = string.Join(";", filePaths), // Сохраняем пути файлов в одну строку
                AnswerTime = DateTime.UtcNow,
                Comment = request.Comment // Сохраняем комментарий
            };

            _context.StudentAnswers.Add(answer);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Answers uploaded successfully", answer });
        }







        [HttpPut("update")]
        public async Task<IActionResult> UpdateAnswer(int materialId, [FromForm] UpdateAnswerRequest request)
        {
            var studentId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var answer = await _context.StudentAnswers
                .FirstOrDefaultAsync(a => a.MaterialId == materialId && a.StudentId == studentId);

            if (answer == null)
                return NotFound(new { message = "Answer not found." });

            // Если переданы файлы, обновляем их
            if (request.Files != null && request.Files.Any())
            {
                // Удаляем старые файлы
                if (!string.IsNullOrEmpty(answer.FilePath))
                {
                    foreach (var oldFilePath in answer.FilePath.Split(";"))
                    {
                        if (System.IO.File.Exists(oldFilePath))
                        {
                            System.IO.File.Delete(oldFilePath);
                        }
                    }
                }

                var filePaths = new List<string>();
                foreach (var file in request.Files)
                {
                    if (file.Length == 0)
                        continue;

                    var filePath = Path.Combine("files", studentId, file.FileName);
                    Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    filePaths.Add(filePath);
                }

                answer.FilePath = string.Join(";", filePaths); // Обновляем список путей файлов
            }

            

            // Если ни файлов, ни комментария не передано, ничего не обновляем
            if (request.Files == null && request.Comment == null)
            {
                return BadRequest(new { message = "No updates provided."+request.Comment });
            }


            answer.Comment = request.Comment;


            // Обновляем время ответа
            answer.AnswerTime = DateTime.UtcNow;

            _context.Entry(answer).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Answer updated successfully.", answer });
        }






        // Удаление ответа
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteAnswer(int materialId)
        {

            var studentId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var answer = await _context.StudentAnswers
                .FirstOrDefaultAsync(a => a.MaterialId == materialId && a.StudentId == studentId);

            if (answer == null)
                return NotFound(new { message = "Answer not found." });

            // Удаляем файл, если он существует
            if (!string.IsNullOrEmpty(answer.FilePath) && System.IO.File.Exists(answer.FilePath))
            {
                System.IO.File.Delete(answer.FilePath);
            }

            _context.StudentAnswers.Remove(answer);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Answer deleted successfully." });
        }

        [HttpPut("grade/{studentId}")]
        public async Task<IActionResult> UpdateGrade(int materialId, string studentId, [FromBody] UpdateAnswerGrade request)
        {

            var teacherId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Находим ответ студента
            var answer = await _context.StudentAnswers
                .FirstOrDefaultAsync(a => a.MaterialId == materialId && a.StudentId == studentId);

            // Проверяем, существует ли ответ
            if (answer == null)
                return NotFound(new { message = "Answer not found." });

            // Находим информацию о учителе по его ID
            var teacher = await _context.Teachers.FirstOrDefaultAsync(t => t.Id == teacherId);

            if (teacher == null)
                return NotFound(new { message = "Teacher not found." });

            // Формируем ФИО учителя в нужном формате (middleName 1 буква, name 1 буква, lastName)
            var teacherFIO = $"{teacher.MiddleName}. {teacher.Name[0]}. {teacher.LastName[0]}.";

            // Обновляем оценку
            answer.Grade = request.Grade ?? answer.Grade; // Обновляем поле Grade (целое число)
            answer.MarkTime = DateTime.UtcNow; // Устанавливаем время, когда была поставлена оценка
            answer.TeacherId = teacherId; // Устанавливаем идентификатор учителя
            answer.TeacherFIO = teacherFIO; // Устанавливаем ФИО учителя
            answer.TeacherComment = request.TeacherComment ?? answer.TeacherComment;

            // Обновляем время последнего изменения
            answer.AnswerTime = DateTime.UtcNow;

            // Сохраняем изменения
            _context.Entry(answer).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(answer );
        }


        private string SaveFile(string studentId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("Invalid file.");

            var uploadPath = Path.Combine(_environment.WebRootPath, "files", studentId);
            Directory.CreateDirectory(uploadPath); // Создаем папку, если она не существует

            var filePath = Path.Combine(uploadPath, Guid.NewGuid() + Path.GetExtension(file.FileName));

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return filePath;
        }




    }
}
