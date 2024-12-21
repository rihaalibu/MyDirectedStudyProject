using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HR_ClientManagement_WebAPI.Models;


namespace HR_ClientManagement_WebAPI.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    [Authorize]
    public class ResourceAllocationController : ControllerBase
    {
        private readonly HRAppDBContext _context;

        public ResourceAllocationController(HRAppDBContext context)
        {
            _context = context;
        }

        [HttpPost("allocate")]
        public async Task<IActionResult> CreateResourceAllocation([FromBody] ProjectResourceAllocation resourceAllocation, HRAppDBContext context)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (resourceAllocation != null)
            {

                resourceAllocation.StartDate = DateTime.SpecifyKind(resourceAllocation.StartDate, DateTimeKind.Utc);
                resourceAllocation.EndDate = DateTime.SpecifyKind(resourceAllocation.EndDate, DateTimeKind.Utc);
                context.ProjectResourceAllocations.Add(resourceAllocation);
                await context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetAllocation), new { id = resourceAllocation.AllocationId }, resourceAllocation);
            }
            else
            {

                return BadRequest();
            }
        }

        public async Task<ActionResult<IEnumerable<ProjectResourceAllocation>>> GetAllocations()
        {
            return await _context.ProjectResourceAllocations
                .Include(rsa => rsa.Project)
                .Include(rsa => rsa.Resource)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectResourceAllocation>> GetAllocation(int id)
        {


            var pra = await _context.ProjectResourceAllocations
                .Include(rsa => rsa.Project)
                .Include(rsa => rsa.Resource)
                .FirstOrDefaultAsync(pra => pra.AllocationId == id);

            if (pra == null)
            {
                return NotFound();
            }
            return pra;
        }

        [HttpGet("project/{projectId}")]
        public async Task<IActionResult> GetAllocationProject(int projectId)
        {


            var pra = await _context.ProjectResourceAllocations
                .Include(rsa => rsa.Resource)
                .Select(rs => new TechnicalResourceDTO
                {
                    ProjectId = rs.ProjectId,
                    EmployeeId = rs.Resource.EmployeeId,
                    EmployeeName = rs.Resource.EmployeeName,
                    Technology = rs.Resource.Technology,
                    Salary = rs.Resource.Salary,
                    IsActive = rs.Resource.IsActive,
                    StartDate = rs.StartDate,
                    EndDate = rs.EndDate

                })
                .Where(pra => pra.ProjectId == projectId).ToListAsync();


            if (pra == null)
            {
                return NotFound();
            }
            return Ok(pra);
        }
    }


}
