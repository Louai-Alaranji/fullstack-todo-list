using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TodoListAPI.Models;

namespace TodoListAPI.Data
{
    public class TodoDbContext: DbContext
    {
        public TodoDbContext(DbContextOptions options) : base(options) { }
        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
