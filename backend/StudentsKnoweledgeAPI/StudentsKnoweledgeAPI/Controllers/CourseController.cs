using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;
using System.Security.Claims;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CourseController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CourseController(AppDbContext context)
        {
            _context = context;
        }

        // ----- Управление разделами курса -----

        [HttpGet("Teacher/{courseId}/Sections")]
        public async Task<IActionResult> GetSectionsByCourseId(int courseId)
        {
            var course = await _context.Courses.Include(c => c.Sections).FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            return Ok(course.Sections);
        }


        [HttpGet("Student/{courseId}/Sections")]
        public async Task<IActionResult> GetVisibleSectionsByCourseId(int courseId)
        {
            var course = await _context.Courses.FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            var sections = await _context.Sections.Where(c => c.CourseId == courseId && c.IsVisible).ToListAsync();

            return Ok(sections);
        }




        [HttpPost("{courseId}/Sections")]
        public async Task<IActionResult> AddSectionToCourse(int courseId, [FromBody] CreateCourseSectionRequest section)
        {
            var course = await _context.Courses.FindAsync(courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            var newSection = new Section
            {
                Name = section.Name,
                CourseId = courseId
            };

            _context.Sections.Add(newSection);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSectionsByCourseId), new { courseId }, newSection);
        }

        [HttpPut("{courseId}/Sections/{sectionId}")]
        public async Task<IActionResult> UpdateSection(int courseId, int sectionId, [FromBody] UpdateSectionRequest updatedSection)
        {
            if (updatedSection == null || string.IsNullOrWhiteSpace(updatedSection.Name))
            {
                return BadRequest(new { message = "Invalid request data." });
            }

            var section = await _context.Sections.FirstOrDefaultAsync(s => s.Id == sectionId && s.CourseId == courseId);

            if (section == null)
            {
                return NotFound(new { message = "Section not found." });
            }

            // Обновление имени секции
            section.Name = updatedSection.Name;


                _context.Entry(section).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(section);
        
        }

        [HttpGet("{courseId}/TaskMaterials")]
        public async Task<IActionResult> GetTaskMaterialsByCourseId(int courseId)
        {
            var sections = await _context.Sections
                .Where(s => s.CourseId == courseId)
                .ToListAsync();

            if (sections == null || !sections.Any())
                return NotFound(new { message = "No sections found for the given course." });

            var sectionIds = sections.Select(s => s.Id).ToList();

            var taskMaterials = await _context.Materials
                .OfType<TaskMaterial>()
                .Where(m => sectionIds.Contains(m.SectionId))
                .Select(m => new
                {
                    m.Id,
                    m.Title,
                    m.Description,
                    m.OpenTime,
                    m.Deadline,
                    m.Grade,
                    SectionName = m.Section.Name
                })
                .ToListAsync();

            return Ok(taskMaterials);
        }

        [HttpGet("{courseId}/TaskMaterialsWithAnswers")]
        public async Task<IActionResult> GetTaskMaterialsWithAnswers(int courseId)
        {
            // Получаем секции, относящиеся к данному курсу
            var sections = await _context.Sections
                .Where(s => s.CourseId == courseId)
                .ToListAsync();

            if (sections == null || !sections.Any())
                return NotFound(new { message = "No sections found for the given course." });

            var sectionIds = sections.Select(s => s.Id).ToList();

            // Получаем TaskMaterials, у которых есть ответы
            var taskMaterialsWithAnswers = await _context.Materials
                .OfType<TaskMaterial>()
                .Where(m => sectionIds.Contains(m.SectionId) && _context.StudentAnswers.Any(a => a.MaterialId == m.Id))
                .Select(m => new
                {
                    m.Id,
                    m.Title,
                    m.Description,
                    m.OpenTime,
                    m.Deadline,
                    m.Grade,
                    SectionName = m.Section.Name
                })
                .ToListAsync();

            if (!taskMaterialsWithAnswers.Any())
                return NotFound(new { message = "No task materials with answers found for the given course." });

            return Ok(taskMaterialsWithAnswers);
        }

        [HttpGet("{courseId}/{groupId}/GroupMarks")]
        public async Task<IActionResult> GetGroupMarks(int courseId ,int groupId)
        {
            // Получаем курс по id, который передается в запросе
            var course = await _context.Courses
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            // Получаем студентов группы
            var students = await _context.Students
                .Where(s => s.GroupId == groupId)
                .ToListAsync();

            if (students == null || !students.Any())
                return NotFound(new { message = "No students found for the given group." });

            // Получаем все материалы для данного курса
            var materials = await _context.Materials
                .OfType<TaskMaterial>()
                .Where(m => m.Section.CourseId == course.Id) // Фильтруем материалы по courseId
                .ToListAsync();

            if (materials == null || !materials.Any())
                return NotFound(new { message = "No materials found for the given course." });

            // Получаем ответы студентов на материалы
            var studentAnswers = await _context.StudentAnswers
                .Where(sa => students.Select(s => s.Id).Contains(sa.StudentId) && materials.Select(m => m.Id).Contains(sa.MaterialId))
                .ToListAsync();

            // Формируем данные о студентах и их оценках
            var groupMarks = students.Select(student => new
            {
                StudentName = $"{student.MiddleName} {student.Name?[0]}. {student.LastName?[0]}.",
                Scores = materials.Select(material =>
                {
                    var answer = studentAnswers.FirstOrDefault(a => a.MaterialId == material.Id && a.StudentId == student.Id);
                    return answer?.Grade ?? 0; // Если ответа нет, считаем оценку равной 0
                }).ToList(),
                Total = materials.Sum(material =>
                {
                    var answer = studentAnswers.FirstOrDefault(a => a.MaterialId == material.Id && a.StudentId == student.Id);
                    return answer?.Grade ?? 0;
                })
            }).ToList();

            return Ok(new
            {
                Headers = materials.Select(m => m.Title).ToList(),
                Students = groupMarks
            });
        }








        [HttpPut("{courseId}/Sections/{sectionId}/Visibility")]
        public async Task<IActionResult> ToggleSectionVisibility(int courseId, int sectionId, [FromBody] bool isVisible)
        {
            var section = await _context.Sections.FirstOrDefaultAsync(s => s.Id == sectionId && s.CourseId == courseId);

            if (section == null)
                return NotFound(new { message = "Section not found." });

            section.IsVisible = isVisible;

            _context.Entry(section).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Section visibility updated successfully.", section });
        }

        [HttpDelete("{courseId}/Sections/{sectionId}")]
        public async Task<IActionResult> DeleteSection(int courseId, int sectionId)
        {
            var section = await _context.Sections.FirstOrDefaultAsync(s => s.Id == sectionId && s.CourseId == courseId);

            if (section == null)
                return NotFound(new { message = "Section not found." });

            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Section deleted successfully." });
        }


        // ----- Управление преподавателями курса -----

        [HttpGet("{courseId}/Teachers")]
        public async Task<IActionResult> GetTeachersByCourseId(int courseId)
        {
            var course = await _context.Courses
                .Include(c => c.Teachers)
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            return Ok(course.Teachers);
        }

        [HttpPost("{courseId}/AddTeacher/{teacherId}")]
        public async Task<IActionResult> AddTeacherToCourse(int courseId, string teacherId)
        {
            var course = await _context.Courses.Include(c => c.Teachers).FirstOrDefaultAsync(c => c.Id == courseId);
            var teacher = await _context.Teachers.FindAsync(teacherId);

            if (course == null || teacher == null)
                return NotFound(new { message = "Course or teacher not found." });

            if (course.Teachers.Any(t => t.Id == teacherId))
                return BadRequest(new { message = "Teacher is already associated with this course." });

            course.Teachers.Add(teacher);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Teacher added to course successfully." });
        }

        [HttpPost("{courseId}/AddTeachers")]
        public async Task<IActionResult> AddTeachersToCourse(int courseId, [FromBody] List<string> teacherIds)
        {
            var course = await _context.Courses.Include(c => c.Teachers).FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            var teachers = await _context.Teachers.Where(t => teacherIds.Contains(t.Id)).ToListAsync();

            if (teachers.Count != teacherIds.Count)
                return NotFound(new { message = "One or more teachers not found." });

            var addedTeachers = new List<Teacher>(); // Список для добавленных преподавателей

            foreach (var teacher in teachers)
            {
                if (course.Teachers.Any(t => t.Id == teacher.Id))
                    return BadRequest(new { message = $"Teacher {teacher.UserName} is already associated with this course." });

                course.Teachers.Add(teacher);
                addedTeachers.Add(teacher); // Добавляем преподавателя в список
            }

            await _context.SaveChangesAsync();

            // Возвращаем добавленных преподавателей в ответе
            return Ok(addedTeachers);
        }



        [HttpDelete("{courseId}/RemoveTeacher/{teacherId}")]
        public async Task<IActionResult> RemoveTeacherFromCourse(int courseId, string teacherId)
        {
            var course = await _context.Courses.Include(c => c.Teachers).FirstOrDefaultAsync(c => c.Id == courseId);
            var teacher = await _context.Teachers.FindAsync(teacherId);

            if (course == null || teacher == null)
                return NotFound(new { message = "Course or teacher not found." });

            if (!course.Teachers.Any(t => t.Id == teacherId))
                return BadRequest(new { message = "Teacher is not associated with this course." });

            course.Teachers.Remove(teacher);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Teacher removed from course successfully." });
        }

        // ----- Управление группами курса -----


        [HttpGet("{courseId}/Groups")]
        public async Task<IActionResult> GetGroupsByCourseId(int courseId)
        {
            var course = await _context.Courses
                .Include(c => c.Groups)
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            return Ok(course.Groups);
        }

        [HttpPost("{courseId}/AddGroup/{groupId}")]
        public async Task<IActionResult> AddGroupToCourse(int courseId, int groupId)
        {
            var course = await _context.Courses.Include(c => c.Groups).FirstOrDefaultAsync(c => c.Id == courseId);
            var group = await _context.Groups.FindAsync(groupId);

            if (course == null || group == null)
                return NotFound(new { message = "Course or group not found." });

            if (course.Groups.Any(g => g.Id == groupId))
                return BadRequest(new { message = "Group is already associated with this course." });

            course.Groups.Add(group);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Group added to course successfully." });
        }

        [HttpPost("{courseId}/AddGroups")]
        public async Task<IActionResult> AddGroupsToCourse(int courseId, [FromBody] List<int> groupIds)
        {
            var course = await _context.Courses.Include(c => c.Groups).FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            // Загружаем все группы по их ID
            var groupsToAdd = await _context.Groups.Where(g => groupIds.Contains(g.Id)).ToListAsync();

            if (groupsToAdd.Count != groupIds.Count)
                return NotFound(new { message = "One or more groups not found." });

            List<Group> addedGroups = new List<Group>();

            foreach (var group in groupsToAdd)
            {
                // Проверяем, не добавлена ли группа уже в курс
                if (!course.Groups.Any(g => g.Id == group.Id))
                {
                    course.Groups.Add(group);
                    addedGroups.Add(group);
                }
            }

            // Сохраняем изменения в базе данных
            await _context.SaveChangesAsync();

            // Возвращаем добавленные группы
            return Ok(addedGroups);
        }


        [HttpDelete("{courseId}/RemoveGroup/{groupId}")]
        public async Task<IActionResult> RemoveGroupFromCourse(int courseId, int groupId)
        {
            var course = await _context.Courses.Include(c => c.Groups).FirstOrDefaultAsync(c => c.Id == courseId);
            var group = await _context.Groups.FindAsync(groupId);

            if (course == null || group == null)
                return NotFound(new { message = "Course or group not found." });

            if (!course.Groups.Any(g => g.Id == groupId))
                return BadRequest(new { message = "Group is not associated with this course." });

            course.Groups.Remove(group);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Group removed from course successfully." });
        }

        // ----- Управление курсом -----

        [HttpGet]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _context.Courses
                .Include(c => c.Groups)
                .Include(c => c.Teachers)
                .ToListAsync();

            return Ok(courses);
        }

        [HttpGet("UserCourses")]
        public async Task<IActionResult> GetCoursesByUser()
        {
            // Получаем текущего пользователя (например, из контекста запроса)
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);  // Assuming you are using JWT authentication
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            // Получаем список курсов, в которых пользователь состоит как студент или преподаватель
            var courses = await _context.Courses
                .Include(c => c.Groups)   // Включаем группы, чтобы проверить студентов
                .Include(c => c.Teachers) // Включаем преподавателей
                .Where(c => c.Groups.Any(g => g.Students.Any(s => s.Id.ToString() == userId)) || c.Teachers.Any(t => t.Id.ToString() == userId))
                .ToListAsync();


            return Ok(courses);
        }


        [HttpGet("{courseId}/Task/{id}")]
        public async Task<IActionResult> GetTaskMaterialById(int courseId, int id)
        {
            // Поиск курса по courseId, включая его секции и материалы
            var course = await _context.Courses
                .Include(c => c.Sections)  // Включаем секции курса
                .ThenInclude(s => s.Materials)  // Включаем материалы секций
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            // Ищем материал среди всех секций курса
            var material = course.Sections
                .SelectMany(s => s.Materials)  // Извлекаем все материалы из секций
                .OfType<TaskMaterial>()  // Фильтруем по типу TaskMaterial
                .FirstOrDefault(m => m.Id == id);

            // Если материал не найден
            if (material == null)
                return NotFound(new { message = "Task material not found." });

            // Извлекаем идентификатор студента из Identity
            var studentId = User.FindFirstValue(ClaimTypes.NameIdentifier);  // Retrieve the user ID

            if (string.IsNullOrEmpty(studentId))
                return Unauthorized(new { message = "Student ID not found in Identity." });

            // Поиск ответа студента
            var studentAnswer = await _context.StudentAnswers
                .FirstOrDefaultAsync(sa => sa.MaterialId == id && sa.StudentId == studentId);

            // Формируем объект результата
            var result = new
            {
                material.Id,
                material.Title,
                material.Description,
                material.Deadline,
                material.Grade,
                material.SectionId,
                material.IsVisible,
                material.Type,
                StudentAnswer = studentAnswer != null
                    ? new
                    {
                        studentAnswer.Id,
                        studentAnswer.FilePath,
                        studentAnswer.Grade,
                        studentAnswer.AnswerTime,
                        studentAnswer.MarkTime,
                        studentAnswer.TeacherId,
                        studentAnswer.TeacherFIO,
                        studentAnswer.Comment
                    }
                    : null
            };

            return Ok(result);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourseById(int id)
        {
            var course = await _context.Courses
                .Include(c => c.Groups)
                .Include(c => c.Teachers)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            return Ok(course);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCourse([FromBody] Course course)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCourseById), new { id = course.Id }, course);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCourse(int id, [FromBody] Course updatedCourse)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
                return NotFound(new { message = "Course not found." });

            course.Name = updatedCourse.Name;
            course.Semester = updatedCourse.Semester;  

            _context.Entry(course).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(course);  
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
                return NotFound(new { message = "Course not found." });

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Course deleted successfully." });
        }


        [HttpGet("TaskMaterials/{materialId}/StudentAnswers")]
        public async Task<IActionResult> GetStudentAnswersByTaskMaterialId(int materialId)
        {
            // Retrieve all student answers for the given TaskMaterial by materialId
            var studentAnswers = await _context.StudentAnswers
                .Include(sa => sa.Student)  // Include related student data
                .Where(sa => sa.MaterialId == materialId)  // Filter by TaskMaterial ID
                .ToListAsync();

            if (studentAnswers == null || !studentAnswers.Any())
            {
                return NotFound(new { message = "No student answers found for the given TaskMaterial." });
            }

            return Ok(studentAnswers);
        }

        [HttpGet("{courseId}/File/{id}")]
        public async Task<IActionResult> GetFileMaterialById(int courseId, int id)
        {
            var course = await _context.Courses
                .Include(c => c.Sections)
                .ThenInclude(s => s.Materials)
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            var material = course.Sections
                .SelectMany(s => s.Materials)
                .OfType<FileMaterial>()
                .FirstOrDefault(m => m.Id == id);

            if (material == null)
                return NotFound(new { message = "File material not found." });

            var result = new
            {
                material.Id,
                material.Title,
                material.SectionId,
                material.IsVisible,
                material.Type,
                material.FilePath
            };

            return Ok(result);
        }

        [HttpGet("{courseId}/TextContent/{id}")]
        public async Task<IActionResult> GetTextContentMaterialById(int courseId, int id)
        {
            var course = await _context.Courses
                .Include(c => c.Sections)
                .ThenInclude(s => s.Materials)
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            var material = course.Sections
                .SelectMany(s => s.Materials)
                .OfType<TextContentMaterial>()
                .FirstOrDefault(m => m.Id == id);

            if (material == null)
                return NotFound(new { message = "Text content material not found." });

            var result = new
            {
                material.Id,
                material.Title,
                material.SectionId,
                material.IsVisible,
                material.Type,
                material.Content
            };

            return Ok(result);
        }



    }
}
