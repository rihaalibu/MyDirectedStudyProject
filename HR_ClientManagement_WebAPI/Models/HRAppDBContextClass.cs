using Microsoft.EntityFrameworkCore;

namespace HR_ClientManagement_WebAPI.Models
{
    public class HRAppDBContextClass : DbContext
    {
        public HRAppDBContextClass(DbContextOptions<HRAppDBContextClass> options) : base(options)
        {
        }

        public HRAppDBContextClass() { } // adding this for unit testing error, parameterless constructor

        public virtual DbSet<ClientDBContextClass> Clients { get; set; }  
        public DbSet<UserDBContextClass> Users { get; set; }
        public DbSet<EmployeeDBContextClass> Employees { get; set; }
        public DbSet<ProjectDBContextClass> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeDBContextClass>()
                .HasOne(e => e.Project) 
                .WithMany(p => p.Employee) 
                .HasForeignKey(e => e.ProjectID); 

            modelBuilder.Entity<ClientDBContextClass>()
                .HasOne(c => c.Project) 
                .WithMany() 
                .HasForeignKey(c => c.ProjectID); 
            
            modelBuilder.Entity<ClientDBContextClass>().Navigation(client => client.Project).AutoInclude();
        }
        
    }
}
