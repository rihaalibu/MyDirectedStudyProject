using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HR_ClientManagement_WebAPI.Models
{
    public class TechnicalResource
    {
        [Key]
        public int EmployeeId { get; set; }
        [Required]
        public string EmployeeName { get; set; }
        public string Technology { get; set; }
        public decimal Salary { get; set; }
        public bool IsActive { get; set; } = true;
        [JsonIgnore]
        public  ICollection<ProjectResourceAllocation>? ProjectAllocations { get; set; }
    }

    public class TechnicalResourceDTO
    {
        public int ProjectId {get; set;}
        public int EmployeeId {get; set; }
        public string EmployeeName {get; set;}
        public string Technology {get; set;}
        public decimal Salary {get; set; }
        public bool IsActive{get; set;}
        public DateTime StartDate{get; set;}
        public DateTime? EndDate{get; set;}

    }

}
