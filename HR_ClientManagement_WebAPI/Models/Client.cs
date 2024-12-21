using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace HR_ClientManagement_WebAPI.Models
{
    public class Client
    {
        [Key]

        public int ClientId { get; set; }

        [Required]

        public string ClientName { get; set; }


        public decimal TotalAmountPaid { get; set; }

        public bool IsActive { get; set; } = true;

        public ICollection<Project>? Projects { get; set; }
    }
}
