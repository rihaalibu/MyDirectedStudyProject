using System.ComponentModel.DataAnnotations;

namespace HR_ClientManagement_WebAPI.Models
{
    public class UserDBContextClass
    {
        [Key]
        public required int UserID { get; set; }  
        public required string Username { get; set; }
        public required string Password { get; set; }  
    }
}
