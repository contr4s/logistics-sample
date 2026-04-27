using Logistics.Application;
using Logistics.Application.Commands.CreateOrder;
using Logistics.Application.Queries;
using Logistics.Application.Queries.GetOrderById;
using Logistics.Application.Queries.GetOrders;
using Logistics.Infrastructure;
using MediatR;
using Scalar.AspNetCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true);
builder.Configuration.AddEnvironmentVariables();
bool enableApiDocs = builder.Configuration.GetValue<bool>("EnableApiDocs");

builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();

WebApplication app = builder.Build();

using (IServiceScope scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<Logistics.Infrastructure.Data.ApplicationDbContext>();
    db.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment() || enableApiDocs)
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseCors("AllowFrontend");

app.MapGet("/health", () => Results.Ok("Healthy"));

app.MapPost("/api/orders", async (CreateOrderCommand command, IMediator mediatR) =>
{
    try
    {
        Guid id = await mediatR.Send(command);
        return Results.Created($"/api/orders/{id}", id);
    }
    catch (FluentValidation.ValidationException ex)
    {
        return Results.BadRequest(ex.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }));
    }
});

app.MapGet("/api/orders", async (IMediator mediatR) =>
{
    var orders = await mediatR.Send(new GetOrdersQuery());
    return Results.Ok(orders);
});

app.MapGet("/api/orders/{id:guid}", async (Guid id, IMediator mediatR) =>
{
    OrderDto? order = await mediatR.Send(new GetOrderByIdQuery(id));
    return order is null ? Results.NotFound() : Results.Ok(order);
});

app.Run();
