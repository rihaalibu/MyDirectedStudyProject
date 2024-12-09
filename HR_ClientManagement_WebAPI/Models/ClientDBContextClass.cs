using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HR_ClientManagement_WebAPI.Models
{
    public class ClientDBContextClass
    {
        [Key]
        [Required]
        [JsonPropertyName("client_id")]
        public required int ClientID { get; set; }
        [Required]
        [JsonPropertyName("client_name")]
        public required string ClientName { get; set; }

        [JsonPropertyName("project_id")]
        public required int ProjectID { get; set; }

        [ForeignKey("ProjectID")]  
        public virtual ProjectDBContextClass Project { get; set; }  
    }
}
