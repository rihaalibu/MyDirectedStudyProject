using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HR_ClientManagement_WebAPI.Models;

namespace HR_ClientManagement_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReportController : ControllerBase
    {
        private readonly HRAppDBContext _context;

        public ReportController(HRAppDBContext context)
        {
            _context = context;
        }

        [HttpGet("resources-by-client/{clientId}")]
        public async Task<IActionResult> GetResourcesByClient(int clientId)
        {
            var resources = await _context.ProjectResourceAllocations
                .Include(pra => pra.Resource)
                .Include(pra => pra.Project)
                .Where(pra => pra.Project.ClientId == clientId)
                .Select(pra => pra.Resource)
                .Distinct()
                .ToListAsync();

            return Ok(resources);
        }

        [HttpGet("project-details/{projectName}")]
        public async Task<IActionResult> GetProjectDetails(string projectName)
        {
            var projectDetails = await _context.Projects
                .Include(p => p.Client)
                .Include(p => p.ResourceAllocations)
                    .ThenInclude(ra => ra.Resource)
                .Where(p => p.ProjectName == projectName)
                .FirstOrDefaultAsync();

            return Ok(projectDetails);
        }

        [HttpGet("revenue-by-client")]
        public  IActionResult GetRevenueByClient()
        {
             //.Where(p => p.ClientId == clientId)
            var revenue =  _context.Projects
                .Select(p => new ClientDTO
                {
                    ClientName = p.Client.ClientName,
                    Revenue = p.ProjectValue,
                    Costs = p.ResourceAllocations
                        .Sum(ra => ra.Resource.Salary),
                    Profit = p.ProjectValue - p.ResourceAllocations
                        .Sum(ra => ra.Resource.Salary),
                    Projects = p.ResourceAllocations.Select(ra => new ProjectRevenueDTO
                    {
                        ProjectName = p.ProjectName,
                        Revenue = p.ProjectValue,
                        ResourceCost = p.ResourceAllocations.Sum(ra => ra.Resource.Salary)

                    })
                }).ToList();


            return Ok(revenue);
        }

        [HttpGet("resources-by-technology")]
        public async Task<IActionResult> GetResourcesByTechnology()
        {
            var techSummary = await _context.TechnicalResources
                .Include(tr => tr.ProjectAllocations)
                    .ThenInclude(pra => pra.Project)
                .GroupBy(tr => tr.Technology)
                .Select(g => new
                {
                    Technology = g.Key,
                    Count = g.Count(),
                    Employees = g.Select(e => new {
                        Id = e.EmployeeId,
                        Name = e.EmployeeName,
                        ProjectName = e.ProjectAllocations
                            .FirstOrDefault().Project.ProjectName ?? "Unassigned"
                    }).ToList()
                })
                .ToListAsync();

            return Ok(techSummary);
        }

        [HttpGet("maintenance-projects")]
        public async Task<IActionResult> GetMaintenanceProjects()
        {
            var maintenanceProjects = await _context.Projects.Select(p =>
                                                                     new ProjectDTO
                                                                     {
                                                                         ProjectId = p.ProjectId,
                                                                         ProjectName = p.ProjectName,
                                                                         IsMaintenanceProject = p.IsMaintenanceProject,
                                                                         ProjectValue = p.ProjectValue,
                                                                         StartDate = p.ResourceAllocations.Where(ra => ra.ProjectId == p.ProjectId).Select(r => r.StartDate).First(),
                                                                         Status = p.IsMaintenanceProject ? "Active" : "NotActive",
                                                                         Resources = p.ResourceAllocations.Select(
                                                                             ra => new ResourceDTO
                                                                             {
                                                                                 EmployeeId = ra.Resource.EmployeeId,
                                                                                 EmployeeName = ra.Resource.EmployeeName,
                                                                                 Technology = ra.Resource.Technology,

                                                                             })
                                                                     }).Where(p => p.IsMaintenanceProject == true)
                .ToListAsync();

            return Ok(maintenanceProjects);
        }
    }
}
