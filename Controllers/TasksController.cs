using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;
using System.Threading.Tasks;
using System.Linq;

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
            var query = _context.Tasks.AsQueryable();

            if (userRole != "Admin")
            {
                query = query.Where(t => t.UserId == userId);
            }

            var tasks = await query
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
                    UserName = t.User != null ? t.User.Username : "Yok",
                    CategoryName = t.Category != null ? t.Category.Name : "Yok"
                })
                .ToListAsync();

            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(TaskItem task)
        {
            if (!Request.Headers.TryGetValue("X-User-Id", out var userIdStr) || !Request.Headers.TryGetValue("X-User-Role", out var userRole))
            {
                return Unauthorized();
            }

            int loggedInUserId = int.Parse(userIdStr!);

            if (userRole != "Admin")
            {
                task.UserId = loggedInUserId;
            }

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

            int loggedInUserId = int.Parse(userIdStr!);
            var existingTask = await _context.Tasks.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
            if (existingTask == null) return NotFound();

            if (userRole != "Admin" && existingTask.UserId != loggedInUserId) return Forbid();
            if (id != task.Id) return BadRequest();

            if (userRole != "Admin")
            {
                task.UserId = loggedInUserId;
            }

            _context.Entry(task).State = EntityState.Modified;
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

            if (userRole != "Admin" && task.UserId != loggedInUserId) return Forbid();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}