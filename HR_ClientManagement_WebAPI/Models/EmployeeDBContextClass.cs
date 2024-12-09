using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR_ClientManagement_WebAPI.Models
{
    public class EmployeeDBContextClass
    {
        [Key]
        public required int EmployeeID { get; set; }  
        public required string EmployeeName { get; set; }  
        public required float Salary { get; set; }

        [ForeignKey("ProjectID")]
        public int ProjectID { get; set; }

        
        public virtual ProjectDBContextClass? Project { get; set; }  
    }
}
