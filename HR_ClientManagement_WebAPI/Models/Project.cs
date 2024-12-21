using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HR_ClientManagement_WebAPI.Models
{
    public class Project
    {
        [Key]
        public int ProjectId { get; set; }

        [Required]
        public string ProjectName { get; set; }

        public bool IsMaintenanceProject { get; set; }
        public decimal ProjectValue { get; set; }
        public int ClientId { get; set; }

        [JsonIgnore]
        public virtual Client? Client { get; set; }
        [JsonIgnore]
        public virtual ICollection<ProjectResourceAllocation>? ResourceAllocations { get; set; }
    }
}
