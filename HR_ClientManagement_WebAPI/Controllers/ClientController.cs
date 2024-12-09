using Microsoft.AspNetCore.Mvc;
using HR_ClientManagement_WebAPI.Models;
using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HR_ClientManagement_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        // GET: api/<ClientController>
        [HttpGet]
        public IEnumerable<string> Get()
        {

            return new string[] { "value1", "value2" };
        }

        // GET api/<ClientController>/1
        [HttpGet("{id}")]
        public IActionResult Get(int id, [FromServices] HRAppDBContextClass context)
        {
            var cl = context.Clients.FirstOrDefault(c => c.ClientID == id);
            if (cl != null)
            {
                return Ok(cl);
            }
            else
            {
                return NotFound("404 - client not found");
            }
        }

        // POST api/<ClientController>
        [HttpPost]
        public IActionResult Post([FromBody] ClientDBContextClass client, [FromServices] HRAppDBContextClass context)
        {
            Debug.WriteLine(client);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (client != null)
            {
                context.Clients.Add(client);  // Add employee object to DbSet
                context.SaveChanges();        // Save changes to the database

                return CreatedAtAction(nameof(Post), new { id = client.ClientID }, client);
            }
            else
            {
                return BadRequest("Empty data");
            }
        }


        // DELETE api/<ClientController>/4
        [HttpDelete("DeleteClient/{id}")]
        public async Task<IActionResult> Delete(int id, [FromServices] HRAppDBContextClass context)
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

        // Update: PUT api/client/updateclient/3
        [HttpPut("updateclient/{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ClientDBContextClass updatedclient, [FromServices] HRAppDBContextClass context)
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
