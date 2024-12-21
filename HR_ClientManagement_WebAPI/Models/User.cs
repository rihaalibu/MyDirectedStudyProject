using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace HR_ClientManagement_WebAPI.Models
{
    public class User: IdentityUser
    {
        [Key]
        public int UserId { get; set; }
        [PersonalData]
        public string Username { get; set; }
        [PersonalData]
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
