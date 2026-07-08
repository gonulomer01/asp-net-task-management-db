using System;
using System.Collections.Generic;

namespace TaskManagementAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = "User";
        public string Department { get; set; } = "Genel";
        public string? Email { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public ICollection<TaskItem>? Tasks { get; set; }
    }
}