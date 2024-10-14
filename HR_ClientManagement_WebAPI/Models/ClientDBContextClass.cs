using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR_ClientManagement_WebAPI.Models
{
    public class ClientDBContextClass
    {
        [Key]
        public required int ClientID { get; set; }  
        public required string ClientName { get; set; }  

        
        public required int ProjectID { get; set; }

        [ForeignKey("ProjectID")]  
        public virtual required ProjectDBContextClass Project { get; set; }  
    }
}
