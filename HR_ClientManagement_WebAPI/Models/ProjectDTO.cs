using System.Collections;

namespace HR_ClientManagement_WebAPI.Models
{

    class ProjectDTO
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public bool IsMaintenanceProject { get; set; }
        public decimal ProjectValue { get; set; }
        public string Status { get; set; }
        public DateTime StartDate { get; set; }
        public IEnumerable<ResourceDTO>? Resources { get; set; }

    }

    class ResourceDTO
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string Technology { get; set; }
        //public DateTime StartDate { get; set; }

    }

    class ClientDTO
    {
        public string ClientName { get; set; }
        public decimal Revenue { get; set; }
        public decimal Costs { get; set; }
        public decimal Profit { get; set; }
        public IEnumerable<ProjectRevenueDTO> Projects { get; set; }


    }

    class ProjectRevenueDTO
    {
        public string ProjectName { get; set; }
        public decimal Revenue { get; set; }
        public decimal ResourceCost { get; set; }

    }



}
