var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(o => o.AddPolicy("AllowAll", p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

var app = builder.Build();
app.UseCors("AllowAll");

var orders = new List<object>();
var nextId = 1;

app.MapGet("/orders", () => Results.Ok(orders));

app.MapPost("/orders", (Order order) =>
{
    var created = new { Id = nextId++, order.ProductId, order.Quantity, order.CustomerName, Status = "Pending" };
    orders.Add(created);
    return Results.Created($"/orders/{created.Id}", created);
});

app.MapGet("/orders/{id:int}", (int id) =>
{
    var order = orders.FirstOrDefault(o => ((dynamic)o).Id == id);
    return order is not null ? Results.Ok(order) : Results.NotFound();
});

app.MapGet("/health", () => Results.Ok(new { status = "healthy", service = "order-service" }));

app.Run();

record Order(int ProductId, int Quantity, string CustomerName);
