using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;
using System.Threading.Tasks;
using System.Linq;
using System.IO;
using System;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            if (!Request.Headers.TryGetValue("X-User-Id", out var userIdStr) || !Request.Headers.TryGetValue("X-User-Role", out var userRole))
            {
                return Unauthorized();
            }

            int userId = int.Parse(userIdStr!);
            var dbTasks = await _context.Tasks.ToListAsync();
            var now = DateTime.Now;
            bool spaceChanged = false;

            foreach (var t in dbTasks)
            {
                if (t.Status == "Pending" && now > t.EndDate)
                {
                    t.Status = "Başarısız";
                    _context.Entry(t).State = EntityState.Modified;
                    spaceChanged = true;
                }
            }
            if (spaceChanged) await _context.SaveChangesAsync();

            var query = _context.Tasks.AsQueryable();
            if (userRole != "Admin")
            {
                query = query.Where(t => t.UserId == userId || t.CreatedById == userId);
            }

            var result = await query
                .Include(t => t.User)
                .Include(t => t.Category)
                .Select(t => new
                {
                    t.Id,
                    t.Title,
                    t.Description,
                    t.Status,
                    t.UserId,
                    t.CategoryId,
                    t.CreatedById,
                    t.StartDate,
                    t.EndDate,
                    t.CompletedImagePath,
                    t.CompletionNote,
                    t.AdminScore,
                    UserName = t.User != null ? t.User.Username : "Yok",
                    CategoryName = t.Category != null ? t.Category.Name : "Yok",
                    CreatedByName = _context.Users.Where(u => u.Id == t.CreatedById).Select(u => u.Username).FirstOrDefault() ?? "Sistem"
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(TaskItem task)
        {
            if (!Request.Headers.TryGetValue("X-User-Id", out var userIdStr)) return Unauthorized();

            var now = DateTime.Now;

            if (task.StartDate.Year < 2025 || task.StartDate.Year > 2035 || task.EndDate.Year < 2025 || task.EndDate.Year > 2035)
            {
                return BadRequest(new { error = "DATE_YEAR_ABSURD" });
            }

            if (task.EndDate <= task.StartDate)
            {
                return BadRequest(new { error = "DATE_RANGE_INVALID" });
            }

            if (task.StartDate > now)
            {
                return BadRequest(new { error = "BOTH_DATES_FUTURE" });
            }

            if (task.EndDate < now)
            {
                return BadRequest(new { error = "BOTH_DATES_PAST" });
            }

            task.CreatedById = int.Parse(userIdStr!);
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskItem task)
        {
            if (!Request.Headers.TryGetValue("X-User-Id", out var userIdStr) || !Request.Headers.TryGetValue("X-User-Role", out var userRole))
            {
                return Unauthorized();
            }

            var now = DateTime.Now;

            if (task.StartDate.Year < 2025 || task.StartDate.Year > 2035 || task.EndDate.Year < 2025 || task.EndDate.Year > 2035)
            {
                return BadRequest(new { error = "DATE_YEAR_ABSURD" });
            }

            if (task.EndDate <= task.StartDate)
            {
                return BadRequest(new { error = "DATE_RANGE_INVALID" });
            }

            if (task.StartDate > now)
            {
                return BadRequest(new { error = "BOTH_DATES_FUTURE" });
            }

            if (task.EndDate < now)
            {
                return BadRequest(new { error = "BOTH_DATES_PAST" });
            }

            int loggedInUserId = int.Parse(userIdStr!);
            var existingTask = await _context.Tasks.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
            if (existingTask == null) return NotFound();

            if (userRole != "Admin" && existingTask.CreatedById != loggedInUserId) return Forbid();
            if (id != task.Id) return BadRequest();

            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("{id}/complete")]
        public async Task<IActionResult> CompleteTask(int id, [FromForm] IFormFile file, [FromForm] string? completionNote)
        {
            if (!Request.Headers.TryGetValue("X-User-Id", out var userIdStr)) return Unauthorized();
            int loggedInUserId = int.Parse(userIdStr!);

            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();
            if (task.UserId != loggedInUserId) return Forbid();

            var now = DateTime.Now;
            if (now < task.StartDate || now > task.EndDate)
            {
                task.Status = "Başarısız";
                await _context.SaveChangesAsync();
                return BadRequest(new { error = "Tarih aralığı dışında işlem yapılamaz." });
            }

            if (file == null || file.Length == 0) return BadRequest();

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            task.CompletedImagePath = "/uploads/" + uniqueFileName;
            task.CompletionNote = completionNote;
            task.Status = "Completed";
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("{id}/score")]
        public async Task<IActionResult> ScoreTask(int id, [FromBody] int score)
        {
            if (!Request.Headers.TryGetValue("X-User-Id", out var userIdStr)) return Unauthorized();
            int loggedInUserId = int.Parse(userIdStr!);

            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();
            if (task.CreatedById != loggedInUserId) return Forbid();
            if (task.Status != "Completed") return BadRequest();
            if (score < 1 || score > 100) return BadRequest();

            task.AdminScore = score;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            if (!Request.Headers.TryGetValue("X-User-Id", out var userIdStr) || !Request.Headers.TryGetValue("X-User-Role", out var userRole))
            {
                return Unauthorized();
            }

            int loggedInUserId = int.Parse(userIdStr!);
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            if (userRole != "Admin" && task.CreatedById != loggedInUserId) return Forbid();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}