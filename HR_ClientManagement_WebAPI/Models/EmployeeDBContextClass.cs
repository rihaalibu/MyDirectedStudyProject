using System.ComponentModel.DataAnnotations;

namespace HR_ClientManagement_WebAPI.Models
{
    public class EmployeeDBContextClass
    {
        [Key]
        public required int EmployeeID { get; set; }  
        public required string EmployeeName { get; set; }  
        public required float Salary { get; set; }

        
        public required int ProjectID { get; set; }

        
        public virtual required ProjectDBContextClass Project { get; set; }  
    }
}
