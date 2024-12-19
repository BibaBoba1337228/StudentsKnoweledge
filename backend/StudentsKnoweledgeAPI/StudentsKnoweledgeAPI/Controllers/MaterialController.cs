using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;
using StudentsKnoweledgeAPI.RequestsTemplates.DTO;
using System.Security.Claims;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/Section/{sectionId}/[controller]")]
    [ApiController]
    [Authorize]
    public class MaterialController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MaterialController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("Teacher")]
        [Authorize(Roles="Teacher,Admin")]
        public async Task<IActionResult> GetMaterialsBySectionId(int sectionId)
        {
            var materials = await _context.Materials
                .Where(m => m.SectionId == sectionId)
                .Include(m => m.Section)
                .ToListAsync();

            var result = materials.Select(m => MapMaterialToSpecificType(m)).ToList();

            return Ok(result);
        }

        [HttpGet("Student")]
        public async Task<IActionResult> GetVisibleMaterialsBySectionId(int sectionId)
        {
            var materials = await _context.Materials
                .Where(m => m.SectionId == sectionId && m.IsVisible)
                .Include(m => m.Section)
                .ToListAsync();

            var result = materials.Select(m => MapMaterialToSpecificType(m)).ToList();

            return Ok(result);
        }


        [HttpPut("{materialId}/Visibility")]
        [Authorize(Roles = "Teacher,Admin")]
        public async Task<IActionResult> ToggleMaterialVisibility(int sectionId, int materialId, [FromBody] bool isVisible)
        {
            var material = await _context.Materials
                .FirstOrDefaultAsync(m => m.SectionId == sectionId && m.Id == materialId);

            if (material == null)
                return NotFound(new { message = "Material not found." });

            material.IsVisible = isVisible;

            var mappedMaterial = MapMaterialToSpecificType(material);

            if (material.Type == "Task")
            {
                var section = await _context.Sections
                    .FirstOrDefaultAsync(s => s.Id == sectionId);

                if (section == null)
                    return NotFound(new { message = "Section not found." });

                var course = await _context.Courses
                    .FirstOrDefaultAsync(c => c.Id == section.CourseId);

                if (course == null)
                    return NotFound(new { message = "Course not found." });

              
                var taskMaterial = mappedMaterial as TaskMaterial;

                if (isVisible && section.IsVisible)
                {
                   
                    var existingEvent = await _context.Events
                        .FirstOrDefaultAsync(e => e.MaterialId == materialId);

                    if (existingEvent == null)
                    {
                        var newEvent = new Event
                        {
                            CourseId = course.Id,
                            MaterialId = materialId,
                            OpenDate = DateTime.Now,
                            CloseDate = taskMaterial?.Deadline ?? DateTime.Now, 
                            Name = material.Title,
                            URL = $"/system/courses/course/{course.Id}/task/{materialId}"
                        };

                        await _context.Events.AddAsync(newEvent);
                        await _context.SaveChangesAsync();
                    }
                }
                else
                {
                    var eventToDelete = await _context.Events
                        .FirstOrDefaultAsync(e => e.MaterialId == materialId);

                    if (eventToDelete != null)
                    {
                        _context.Events.Remove(eventToDelete);
                        await _context.SaveChangesAsync();
                    }
                }
            }

            _context.Entry(material).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Material visibility updated successfully." });
        }






        // ----- Управление заданиями -----


        [HttpPost("Task")]
        [Authorize(Roles = "Teacher,Admin")]
        public async Task<IActionResult> CreateTaskMaterial(int sectionId, [FromBody] CreateTaskMaterialRequest request)
        {
            var section = await _context.Sections.FindAsync(sectionId);
            if (section == null)
                return NotFound(new { message = "Section not found." });

            var newMaterial = new TaskMaterial
            {
                Title = request.Title,
                Description = request.Description,
                Deadline = request.Deadline ?? DateTime.MinValue,
                Grade = request.Grade,
                SectionId = sectionId
            };

            _context.Materials.Add(newMaterial);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMaterialsBySectionId), new { sectionId }, newMaterial);
        }

        [HttpPut("Task/{id}")]
        [Authorize(Roles = "Teacher,Admin")]
        public async Task<IActionResult> UpdateTaskMaterial(int sectionId, int id, [FromBody] UpdateTaskMaterialRequest request)
        {
            var material = await _context.Materials.OfType<TaskMaterial>().FirstOrDefaultAsync(m => m.Id == id && m.SectionId == sectionId);
            if (material == null)
                return NotFound(new { message = "Task material not found." });

            material.Title = request.Title ?? material.Title;
            material.Description = request.Description ?? material.Description;
            material.Deadline = request.Deadline ?? material.Deadline;
            material.Grade = request.Grade ?? material.Grade;

            _context.Entry(material).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(material);
        }


        // ----- Управление файлами -----

        [HttpPost("File")]
        [Authorize(Roles = "Teacher,Admin")]
        public async Task<IActionResult> CreateFileMaterial(int sectionId, [FromForm] CreateFileMaterialRequest request)
        {
            var section = await _context.Sections.FindAsync(sectionId);
            if (section == null)
                return NotFound(new { message = "Section not found." });

            var filePaths = new List<string>();

            // Обработка файлов
            foreach (var file in request.Files)
            {
                if (file.Length == 0)
                    continue;

                var filePath = Path.Combine("files", "materials", sectionId.ToString(), file.FileName);
                Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                filePaths.Add(filePath);
            }

            var newMaterial = new FileMaterial
            {
                Title = request.Title,
                FilePath = string.Join(";", filePaths), 
                SectionId = sectionId
            };

            _context.Materials.Add(newMaterial);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMaterialsBySectionId), new { sectionId }, newMaterial);
        }

        [HttpPut("File/{id}")]
        [Authorize(Roles = "Teacher,Admin")]
        public async Task<IActionResult> UpdateFileMaterial(int sectionId, int id, [FromForm] UpdateFileMaterialRequest request)
        {
            var material = await _context.Materials
                .Where(m => m.Id == id && m.SectionId == sectionId)
                .FirstOrDefaultAsync();

            if (material == null)
                return NotFound(new { message = "File material not found." });

            var fileMaterial = material as FileMaterial;

            if (fileMaterial == null)
                return NotFound(new { message = "File material not found." });

            var filePaths = fileMaterial.FilePath?.Split(";").ToList() ?? new List<string>();

            if (request.Files != null && request.Files.Any())
            {
                foreach (var oldFilePath in filePaths)
                {
                    if (System.IO.File.Exists(oldFilePath))
                    {
                        System.IO.File.Delete(oldFilePath);
                    }
                }

                filePaths.Clear(); 

                foreach (var file in request.Files)
                {
                    if (file.Length == 0)
                        continue;

                    var filePath = Path.Combine("files", "materials", sectionId.ToString(), file.FileName);
                    Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    filePaths.Add(filePath);
                }
            }

            fileMaterial.Title = request.Title ?? fileMaterial.Title;
            fileMaterial.FilePath = string.Join(";", filePaths);

            _context.Entry(fileMaterial).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "File material updated successfully.", material });
        }





        // ----- Управление текст блоками -----

        [HttpPost("TextContent")]
        [Authorize(Roles = "Teacher,Admin")]
        public async Task<IActionResult> CreateTextContentMaterial(int sectionId, [FromBody] CreateTextContentMaterialRequest request)
        {
            var section = await _context.Sections.FindAsync(sectionId);
            if (section == null)
                return NotFound(new { message = "Section not found." });

            var newMaterial = new TextContentMaterial
            {
                Title = request.Title,
                Content = request.Content,
                SectionId = sectionId
            };

            _context.Materials.Add(newMaterial);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMaterialsBySectionId), new { sectionId }, newMaterial);
        }

        [HttpPut("TextContent/{id}")]
        [Authorize(Roles = "Teacher,Admin")]
        public async Task<IActionResult> UpdateTextContentMaterial(int sectionId, int id, [FromBody] UpdateTextContentMaterialRequest request)
        {
            var material = await _context.Materials.OfType<TextContentMaterial>().FirstOrDefaultAsync(m => m.Id == id && m.SectionId == sectionId);
            if (material == null)
                return NotFound(new { message = "Text content material not found." });

            material.Title = request.Title ?? material.Title;
            material.Content = request.Content ?? material.Content;

            _context.Entry(material).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Text content material updated successfully.", material });
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "Teacher,Admin")]
        public async Task<IActionResult> DeleteMaterial(int sectionId, int id)
        {
            var material = await _context.Materials.FirstOrDefaultAsync(m => m.Id == id && m.SectionId == sectionId);

            if (material == null)
                return NotFound(new { message = "Material not found." });

            _context.Materials.Remove(material);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Material deleted successfully." });
        }

       





        private object MapMaterialToSpecificType(Material material)
        {
            switch (material)
            {
                case FileMaterial fileMaterial:
                    return new
                    {
                        fileMaterial.Id,
                        fileMaterial.Title,
                        fileMaterial.SectionId,
                        fileMaterial.IsVisible,
                        fileMaterial.Type,
                        fileMaterial.FilePath
                    };
                case TextContentMaterial textContentMaterial:
                    return new
                    {
                        textContentMaterial.Id,
                        textContentMaterial.Title,
                        textContentMaterial.SectionId,
                        textContentMaterial.IsVisible,
                        textContentMaterial.Type,
                        textContentMaterial.Content
                    };
                case TaskMaterial taskMaterial:
                    return new
                    {
                        taskMaterial.Id,
                        taskMaterial.Title,
                        taskMaterial.SectionId,
                        taskMaterial.IsVisible,
                        taskMaterial.Type,
                        taskMaterial.Description,
                        taskMaterial.OpenTime,
                        taskMaterial.Deadline,
                        taskMaterial.Grade
                    };
                default:
                    return new
                    {
                        material.Id,
                        material.Title,
                        material.SectionId,
                        material.IsVisible,
                        material.Type
                    };
            }
        }
    }
}
