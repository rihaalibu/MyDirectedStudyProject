using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR_ClientManagement_WebAPI.Models
{
    public class ProjectDBContextClass
    {
        [Key]
        public required int ProjectID { get; set; }  
        public required string ProjectName { get; set; }

        //public int EmployeeID { get; set; }

        //[ForeignKey("EmployeeID")]
        public virtual IEnumerable <EmployeeDBContextClass>? Employee { get; set; }
    }
}

