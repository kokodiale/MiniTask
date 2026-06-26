using Microsoft.EntityFrameworkCore;
using MiniTask.Api.Data;
using MiniTask.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=tasks.db"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    db.Database.EnsureCreated();

    if (!db.Tasks.Any())
    {
        db.Tasks.Add(new TaskItem
        {
            Title = "Pierwsze zadanie",
            Description = "Przykładowe zadanie zapisane w bazie SQLite.",
            Status = "Nowe"
        });

        db.SaveChanges();
    }
}

app.MapGet("/", () => "MiniTask API działa poprawnie");

app.MapGet("/api/tasks", (AppDbContext db) =>
{
    return db.Tasks.ToList();
});

app.MapGet("/api/tasks/{id}", (int id, AppDbContext db) =>
{
    var task = db.Tasks.Find(id);

    if (task == null)
    {
        return Results.NotFound("Nie znaleziono zadania o podanym ID.");
    }

    return Results.Ok(task);
});

app.MapPost("/api/tasks", (TaskItem newTask, AppDbContext db) =>
{
    if (string.IsNullOrWhiteSpace(newTask.Title))
    {
        return Results.BadRequest("Tytuł zadania nie może być pusty.");
    }

    newTask.Id = 0;

    if (string.IsNullOrWhiteSpace(newTask.Status))
    {
        newTask.Status = "Nowe";
    }

    db.Tasks.Add(newTask);
    db.SaveChanges();

    return Results.Created($"/api/tasks/{newTask.Id}", newTask);
});

app.MapPut("/api/tasks/{id}", (int id, TaskItem updatedTask, AppDbContext db) =>
{
    var task = db.Tasks.Find(id);

    if (task == null)
    {
        return Results.NotFound("Nie znaleziono zadania do edycji.");
    }

    if (string.IsNullOrWhiteSpace(updatedTask.Title))
    {
        return Results.BadRequest("Tytuł zadania nie może być pusty.");
    }

    task.Title = updatedTask.Title;
    task.Description = updatedTask.Description;
    task.Status = updatedTask.Status;

    db.SaveChanges();

    return Results.Ok(task);
});

app.MapDelete("/api/tasks/{id}", (int id, AppDbContext db) =>
{
    var task = db.Tasks.Find(id);

    if (task == null)
    {
        return Results.NotFound("Nie znaleziono zadania do usunięcia.");
    }

    db.Tasks.Remove(task);
    db.SaveChanges();

    return Results.NoContent();
});

app.Run();