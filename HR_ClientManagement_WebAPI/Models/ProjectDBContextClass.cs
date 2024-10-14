using System.ComponentModel.DataAnnotations;

namespace HR_ClientManagement_WebAPI.Models
{
    public class ProjectDBContextClass
    {
        [Key]
        public required int ProjectID { get; set; }  
        public required string ProjectName { get; set; }  

        public virtual required ICollection<EmployeeDBContextClass> Employees { get; set; }  
    }
}
