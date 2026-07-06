using System;
using System.Collections.Generic;

namespace TaskManagementAPI.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public ICollection<TaskItem> Tasks { get; set; }
    }
}