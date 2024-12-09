using HR_ClientManagement_WebAPI.Models;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
 {
     options.SuppressConsumesConstraintForFormFileParameters = true;
     options.SuppressInferBindingSourcesForParameters = true;
     options.SuppressModelStateInvalidFilter = true;
     options.SuppressMapClientErrors = true;
     options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
         "https://httpstatuses.com/404";
 });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "wwwroot";

});
//builder.WebHost.UseWebRoot("react-app");


builder.Services.AddDbContext<HRAppDBContextClass>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}




//app.UseHttpsRedirection();

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{/}"
//    );
app.UseAuthorization();

app.MapControllers();

//app.UseSpaStaticFiles();

app.UseDefaultFiles();
app.UseStaticFiles();

//app.UseCors("AllowReactApp");

app.UseCors(builder => {
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
});
/*
app.UseSpa(spa =>
{
    spa.Options.SourcePath = "react-app/dist";

    if (app.Environment.IsDevelopment())
    {
        spa.UseReactDevelopmentServer(npmScript: "start");
    }
});

*/
app.MapFallbackToFile("index.html");

app.Run();
