using Microsoft.AspNetCore.Mvc;
using HR_ClientManagement_WebAPI.Models;
using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using NuGet.Protocol;


namespace HR_ClientManagement_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {

        [HttpGet]
        public IEnumerable<Object> Get([FromServices] HRAppDBContext context)
        {
            var cl_list = context.Clients.ToList();
            return cl_list;
        }


        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id, [FromServices] HRAppDBContext context)
        {
            var cl = context.Clients.FirstOrDefault(c => c.ClientId == id);
            if (cl != null)
            {
                return Ok(cl);
            }
            else
            {
                return NotFound("404 - client not found");
            }
        }


        [Authorize]
        [HttpPost]
        public IActionResult Post([FromBody] Client client, [FromServices] HRAppDBContext context)
        {
            Debug.WriteLine(client);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (client != null)
            {
                context.Clients.Add(client);
                context.SaveChanges();

                return CreatedAtAction(nameof(Post), new { id = client.ClientId }, client);
            }
            else
            {
                return BadRequest("Empty data");
            }
        }



        [Authorize]
        [HttpDelete("DeleteClient/{id}")]
        public async Task<IActionResult> Delete(int id, [FromServices] HRAppDBContext context)
        {
            var client = await context.Clients.FindAsync(id);
            if (client == null)
            {
                return NotFound("Client not found");
            }
            context.Clients.Remove(client);
            await context.SaveChangesAsync();
            return Ok("Client deleted successfully");
        }


        [Authorize]
        [HttpPut("updateclient/{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Client updatedclient, [FromServices] HRAppDBContext context)
        {
            var existingclient = await context.Clients.FindAsync(id);

            if (existingclient == null)
            {
                return NotFound("client not found");

            }
            existingclient.ClientName = updatedclient.ClientName;
            //existingclient.ProjectID = updatedclient.ProjectID;
            await context.SaveChangesAsync();
            return Ok("updated successfully");
        }

        // PUT api/<ClientController>/5

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
