
using System.ComponentModel.DataAnnotations;


namespace HR_ClientManagement_WebAPI.Models
{
    public class AdminUser
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        
        public string Role { get; set; } = "Admin";
    }
}
