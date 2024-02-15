using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoListAPI.Data;
using TodoListAPI.Models;

namespace TodoListAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private readonly TodoDbContext _db;
        public TodoController(TodoDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllItmes()
        {
            var todoItems = await _db.TodoItems.ToListAsync();
            return Ok(todoItems);
        }

        [HttpPost]
        public async Task<IActionResult> AddItem(PostItemRequest newItem)
        {
            var todoItem = new TodoItem
            {
                id = Guid.NewGuid(),
                name = newItem.name,
                description = newItem.description
            };
            await _db.TodoItems.AddAsync(todoItem);
            _db.SaveChanges();
            return Ok(todoItem);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteItem([FromRoute] Guid id)
        {
            var item = await _db.TodoItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            else
            {
                _db.TodoItems.Remove(item);
                _db.SaveChanges();
                return Ok(item);
            }
        }
    }
}
