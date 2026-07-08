using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagementAPI.Data;
using TaskManagementAPI.Models;
using System.Threading.Tasks;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            var exists = await _context.Users.AnyAsync(u => u.Username == user.Username);
            if (exists) return BadRequest(new { error = "Kullanıcı adı zaten mevcut." });

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Başarılı" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginModel)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == loginModel.Username && u.Password == loginModel.Password);
            if (user == null) return Unauthorized(new { error = "Geçersiz kullanıcı adı veya şifre." });

            return Ok(new { id = user.Id, username = user.Username, role = user.Role, department = user.Department });
        }
    }
}