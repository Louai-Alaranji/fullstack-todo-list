using Microsoft.EntityFrameworkCore;
using TodoListAPI.Data;
using Microsoft.AspNetCore.Identity;
using TodoListAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TodoDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("TodoListAPIConnectionString")));

// Add ASP.NET Core Identity services


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", builder =>
    {
        builder.WithOrigins("http://localhost:5173") // Adjust origin as needed
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowLocalhost");

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();


app.MapControllers();

app.Run();
