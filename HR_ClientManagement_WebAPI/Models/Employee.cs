using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR_ClientManagement_WebAPI.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeID { get; set; }

        [Required]
        public string EmployeeName { get; set; }


        public string Technology { get; set; }
        public float Salary { get; set; }
        public int? ProjectID { get; set; }
        public Project? Project { get; set; }
    }
}
