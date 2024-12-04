using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;
using StudentsKnoweledgeAPI.RequestsTemplates;

namespace StudentsKnoweledgeAPI.Controllers
{
    [Route("api/Section/{sectionId}/[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MaterialController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetMaterialsBySectionId(int sectionId)
        {
            var materials = await _context.Materials
                .Where(m => m.SectionId == sectionId)
                .Select(m => new
                {
                    m.Id,
                    m.Title,
                    m.SectionId,
                    m.IsVisible,
                    Type = m.Type 
                })
                .ToListAsync();

            return Ok(materials);
        }

        [HttpPut("{materialId}/Visibility")]
        public async Task<IActionResult> ToggleMaterialVisibility(int sectionId, int materialId, [FromBody] bool isVisible)
        {
            var material = await _context.Materials
                .FirstOrDefaultAsync(m => m.SectionId == sectionId && m.Id == materialId);

            if (material == null)
                return NotFound(new { message = "Material not found." });

            material.IsVisible = isVisible;

            _context.Entry(material).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Material visibility updated successfully." });
        }



        // ----- Управление заданиями -----


        [HttpPost("Task")]
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

            return Ok(new { message = "Task material updated successfully.", material });
        }


        // ----- Управление файлами -----

        [HttpPost("File")]
        public async Task<IActionResult> CreateFileMaterial(int sectionId, [FromBody] CreateFileMaterialRequest request)
        {
            var section = await _context.Sections.FindAsync(sectionId);
            if (section == null)
                return NotFound(new { message = "Section not found." });

            var newMaterial = new FileMaterial
            {
                Title = request.Title,
                FilePath = request.FilePath,
                SectionId = sectionId
            };

            _context.Materials.Add(newMaterial);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMaterialsBySectionId), new { sectionId }, newMaterial);
        }

        [HttpPut("File/{id}")]
        public async Task<IActionResult> UpdateFileMaterial(int sectionId, int id, [FromBody] UpdateFileMaterialRequest request)
        {
            var material = await _context.Materials.OfType<FileMaterial>().FirstOrDefaultAsync(m => m.Id == id && m.SectionId == sectionId);
            if (material == null)
                return NotFound(new { message = "File material not found." });

            material.Title = request.Title ?? material.Title;
            material.FilePath = request.FilePath ?? material.FilePath;

            _context.Entry(material).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new { message = "File material updated successfully.", material });
        }


        // ----- Управление текст блоками -----

        [HttpPost("TextContent")]
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
        public async Task<IActionResult> DeleteMaterial(int sectionId, int id)
        {
            var material = await _context.Materials.FirstOrDefaultAsync(m => m.Id == id && m.SectionId == sectionId);

            if (material == null)
                return NotFound(new { message = "Material not found." });

            _context.Materials.Remove(material);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Material deleted successfully." });
        }
    }
}
