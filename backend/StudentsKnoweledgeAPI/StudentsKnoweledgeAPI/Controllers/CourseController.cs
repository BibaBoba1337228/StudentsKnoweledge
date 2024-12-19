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


        [Authorize(Roles = "Teacher, Admin")]
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



        [Authorize(Roles = "Teacher, Admin")]
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

        [Authorize(Roles = "Teacher, Admin")]
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
            var sections = await _context.Sections
                .Where(s => s.CourseId == courseId)
                .ToListAsync();

            if (sections == null || !sections.Any())
                return NotFound(new { message = "No sections found for the given course." });

            var sectionIds = sections.Select(s => s.Id).ToList();

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


            return Ok(taskMaterialsWithAnswers);
        }

        [HttpGet("{courseId}/{groupId}/GroupMarks")]
        public async Task<IActionResult> GetGroupMarks(int courseId ,int groupId)
        {
            var course = await _context.Courses
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            var students = await _context.Students
                .Where(s => s.GroupId == groupId)
                .ToListAsync();

            if (students == null || !students.Any())
                return NotFound(new { message = "No students found for the given group." });

            var materials = await _context.Materials
                .OfType<TaskMaterial>()
                .Where(m => m.Section.CourseId == course.Id) 
                .ToListAsync();

            if (materials == null || !materials.Any())
                return NotFound(new { message = "No materials found for the given course." });

            var studentAnswers = await _context.StudentAnswers
                .Where(sa => students.Select(s => s.Id).Contains(sa.StudentId) && materials.Select(m => m.Id).Contains(sa.MaterialId))
                .ToListAsync();

            var groupMarks = students.Select(student => new
            {
                StudentName = $"{student.MiddleName} {student.Name?[0]}. {student.LastName?[0]}.",
                Scores = materials.Select(material =>
                {
                    var answer = studentAnswers.FirstOrDefault(a => a.MaterialId == material.Id && a.StudentId == student.Id);
                    return answer?.Grade ?? 0; 
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






        [Authorize(Roles = "Teacher, Admin")]
        [HttpPut("{courseId}/Sections/{sectionId}/Visibility")]
        public async Task<IActionResult> ToggleSectionVisibility(int courseId, int sectionId, [FromBody] bool isVisible)
        {
            var section = await _context.Sections.FirstOrDefaultAsync(s => s.Id == sectionId && s.CourseId == courseId);

            if (section == null)
                return NotFound(new { message = "Section not found." });

            section.IsVisible = isVisible;

            if (!isVisible)
            {
                var taskMaterials = await _context.Materials
                    .OfType<TaskMaterial>()
                    .Where(m => m.SectionId == sectionId)
                    .ToListAsync();

                var taskMaterialIds = taskMaterials.Select(tm => tm.Id).ToList();

                var eventsToDelete = await _context.Events
                    .Where(e => taskMaterialIds.Contains(e.MaterialId))
                    .ToListAsync();

                _context.Events.RemoveRange(eventsToDelete);
                await _context.SaveChangesAsync();
            }
            else
            {
                var taskMaterials = await _context.Materials
                    .OfType<TaskMaterial>()
                    .Where(m => m.SectionId == sectionId)
                    .ToListAsync();

                var course = await _context.Courses.FirstOrDefaultAsync(c => c.Id == courseId);
                if (course == null)
                    return NotFound(new { message = "Course not found." });

                foreach (var taskMaterial in taskMaterials)
                {
                    var existingEvent = await _context.Events
                        .FirstOrDefaultAsync(e => e.MaterialId == taskMaterial.Id);

                    if (existingEvent == null)
                    {
                        var newEvent = new Event
                        {
                            CourseId = course.Id,
                            MaterialId = taskMaterial.Id,
                            OpenDate = DateTime.Now, 
                            CloseDate = taskMaterial.Deadline, 
                            Name = taskMaterial.Title,
                            URL = $"/system/courses/course/{course.Id}/task/{taskMaterial.Id}"
                        };

                        await _context.Events.AddAsync(newEvent);
                    }
                }

                await _context.SaveChangesAsync();
            }

            _context.Entry(section).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Section visibility updated successfully.", section });
        }


        [Authorize(Roles = "Teacher, Admin")]
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

        [Authorize(Roles = "Admin")]
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


        [Authorize(Roles = "Admin")]
        [HttpPost("{courseId}/AddTeachers")]
        public async Task<IActionResult> AddTeachersToCourse(int courseId, [FromBody] List<string> teacherIds)
        {
            var course = await _context.Courses.Include(c => c.Teachers).FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            var teachers = await _context.Teachers.Where(t => teacherIds.Contains(t.Id)).ToListAsync();

            if (teachers.Count != teacherIds.Count)
                return NotFound(new { message = "One or more teachers not found." });

            var addedTeachers = new List<Teacher>(); 

            foreach (var teacher in teachers)
            {
                if (course.Teachers.Any(t => t.Id == teacher.Id))
                    return BadRequest(new { message = $"Teacher {teacher.UserName} is already associated with this course." });

                course.Teachers.Add(teacher);
                addedTeachers.Add(teacher); 
            }

            await _context.SaveChangesAsync();

            return Ok(addedTeachers);
        }


        [Authorize(Roles = "Admin")]
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

        [Authorize(Roles = "Teacher, Admin")]
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

        [Authorize(Roles = "Teacher, Admin")]
        [HttpPost("{courseId}/AddGroups")]
        public async Task<IActionResult> AddGroupsToCourse(int courseId, [FromBody] List<int> groupIds)
        {
            var course = await _context.Courses.Include(c => c.Groups).FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

            var groupsToAdd = await _context.Groups.Where(g => groupIds.Contains(g.Id)).ToListAsync();

            if (groupsToAdd.Count != groupIds.Count)
                return NotFound(new { message = "One or more groups not found." });

            List<Group> addedGroups = new List<Group>();

            foreach (var group in groupsToAdd)
            {
                if (!course.Groups.Any(g => g.Id == group.Id))
                {
                    course.Groups.Add(group);
                    addedGroups.Add(group);
                }
            }

            await _context.SaveChangesAsync();

            return Ok(addedGroups);
        }

        [Authorize(Roles = "Teacher, Admin")]
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


        [HttpGet]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _context.Courses
                .Include(c => c.Groups)
                .Include(c => c.Teachers)
                .ToListAsync();

            return Ok(courses);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("paginated")]
        public async Task<IActionResult> GetAllCoursesPaginated([FromQuery] int page, [FromQuery] int limit)
        {
            var totalCourses = await _context.Courses.CountAsync();


            var courses = await _context.Courses
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();


            var result = new
            {
                TotalCount = totalCourses,
                Data = courses
            };
            return Ok(result);
        }


        [HttpGet("UserCourses")]
        public async Task<IActionResult> GetCoursesByUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userRole = User.FindFirstValue(ClaimTypes.Role);

            var user = await _context.Users.FindAsync(userId);



            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "User is not authenticated." });
            }

            if (user.Role == UserRole.Admin) 
            {
                var allCourses = await _context.Courses
                    .Include(c => c.Groups)   
                    .Include(c => c.Teachers) 
                    .ToListAsync();


                return Ok(allCourses);
            }

            var courses = await _context.Courses
                .Include(c => c.Groups)   
                .Include(c => c.Teachers) 
                .Where(c => c.Groups.Any(g => g.Students.Any(s => s.Id.ToString() == userId))
                         || c.Teachers.Any(t => t.Id.ToString() == userId))
                .ToListAsync();

            return Ok(courses);
        }



        [HttpGet("{courseId}/Task/{id}")]
        public async Task<IActionResult> GetTaskMaterialById(int courseId, int id)
        {
        
            var course = await _context.Courses
                .Include(c => c.Sections)
                .ThenInclude(s => s.Materials)
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
                return NotFound(new { message = "Course not found." });

        
            var material = course.Sections
                .SelectMany(s => s.Materials)
                .OfType<TaskMaterial>()
                .FirstOrDefault(m => m.Id == id);

            if (material == null)
                return NotFound(new { message = "Task material not found." });


            var studentId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(studentId))
                return Unauthorized(new { message = "Student ID not found in Identity." });


            var studentAnswer = await _context.StudentAnswers
                .FirstOrDefaultAsync(sa => sa.MaterialId == id && sa.StudentId == studentId);


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

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateCourse([FromBody] Course course)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCourseById), new { id = course.Id }, course);
        }


        [Authorize(Roles = "Teacher, Admin")]
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

        [Authorize(Roles = "Admin")]
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

        [Authorize(Roles = "Teacher, Admin")]
        [HttpGet("TaskMaterials/{materialId}/StudentAnswers")]
        public async Task<IActionResult> GetStudentAnswersByTaskMaterialId(int materialId)
        {
            
            var studentAnswers = await _context.StudentAnswers
                .Include(sa => sa.Student)  
                .Where(sa => sa.MaterialId == materialId)  
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
