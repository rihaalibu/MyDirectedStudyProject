using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HR_ClientManagement_WebAPI.Models;

namespace HR_ClientManagement_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TechnicalResourceController : ControllerBase
    {
        private readonly HRAppDBContext _context;

        public TechnicalResourceController(HRAppDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TechnicalResource>>> GetResources()
        {
            return await _context.TechnicalResources
                .Include(t => t.ProjectAllocations)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TechnicalResource>> GetResource(int id)
        {
            var resource = await _context.TechnicalResources
                .Include(t => t.ProjectAllocations)
                .FirstOrDefaultAsync(t => t.EmployeeId == id);

            if (resource == null)
                return NotFound();

            return resource;
        }

        [HttpGet("byTechnology/{technology}")]
        public async Task<ActionResult<IEnumerable<TechnicalResource>>> GetResourcesByTechnology(string technology)
        {
            return await _context.TechnicalResources
                .Where(t => t.Technology == technology)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<TechnicalResource>> CreateResource(TechnicalResource resource)
        {
            _context.TechnicalResources.Add(resource);
            await _context.SaveChangesAsync();
            

            return CreatedAtAction(nameof(GetResource), new { id = resource.EmployeeId }, resource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateResource(int id, TechnicalResource resource)
        {
            if (id != resource.EmployeeId)
                return BadRequest();

            _context.Entry(resource).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResourceExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResource(int id)
        {
            var resource = await _context.TechnicalResources.FindAsync(id);
            if (resource == null)
                return NotFound();

            _context.TechnicalResources.Remove(resource);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResourceExists(int id)
        {
            return _context.TechnicalResources.Any(e => e.EmployeeId == id);
        }
    }
}
