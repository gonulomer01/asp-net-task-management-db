using System;

namespace TaskManagementAPI.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Status { get; set; } = "Pending";
        public int UserId { get; set; }
        public int? CategoryId { get; set; }
        public int CreatedById { get; set; }
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime EndDate { get; set; } = DateTime.Now;
        public string? CompletedImagePath { get; set; }
        public string? CompletionNote { get; set; }
        public int? AdminScore { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public User? User { get; set; }
        public Category? Category { get; set; }
    }
}