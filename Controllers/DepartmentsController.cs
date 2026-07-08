using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DepartmentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> Get()
        {
            return await _context.Departments.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post(Department item)
        {
            if (!Request.Headers.TryGetValue("X-User-Role", out var userRole) || userRole != "Admin")
            {
                return Forbid();
            }

            _context.Departments.Add(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Department item)
        {
            if (!Request.Headers.TryGetValue("X-User-Role", out var userRole) || userRole != "Admin")
            {
                return Forbid();
            }

            if (id != item.Id) return BadRequest();

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!Request.Headers.TryGetValue("X-User-Role", out var userRole) || userRole != "Admin")
            {
                return Forbid();
            }

            var existing = await _context.Departments.FindAsync(id);
            if (existing == null) return NotFound();

            bool inUse = await _context.Users.AnyAsync(u => u.Department == existing.Name);
            if (inUse)
            {
                return BadRequest(new { error = "DEPARTMENT_IN_USE" });
            }

            _context.Departments.Remove(existing);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}