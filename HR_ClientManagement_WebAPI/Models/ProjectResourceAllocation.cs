using System.ComponentModel.DataAnnotations;

namespace HR_ClientManagement_WebAPI.Models
{
    public class ProjectResourceAllocation
    {
        [Key]
        public int AllocationId { get; set; }
        public int ProjectId { get; set; }
        public int ResourceId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Project? Project { get; set; }
        public TechnicalResource? Resource { get; set; }
    }

}
