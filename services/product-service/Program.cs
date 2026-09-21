var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(o => o.AddPolicy("AllowAll", p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

var app = builder.Build();
app.UseCors("AllowAll");

var products = new[]
{
    new { Id = 1, Name = "Laptop",     Price = 999.99,  Stock = 10 },
    new { Id = 2, Name = "Headphones", Price = 149.99,  Stock = 25 },
    new { Id = 3, Name = "Keyboard",   Price = 79.99,   Stock = 50 },
    new { Id = 4, Name = "Mouse",      Price = 49.99,   Stock = 40 },
};

app.MapGet("/products", () => Results.Ok(products));
app.MapGet("/products/{id:int}", (int id) =>
{
    var product = products.FirstOrDefault(p => p.Id == id);
    return product is not null ? Results.Ok(product) : Results.NotFound();
});
app.MapGet("/health", () => Results.Ok(new { status = "healthy", service = "product-service" }));

app.Run();
