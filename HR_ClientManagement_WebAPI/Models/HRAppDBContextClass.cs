using Microsoft.EntityFrameworkCore;

namespace HR_ClientManagement_WebAPI.Models
{
    public class HRAppDBContextClass : DbContext
    {
        public HRAppDBContextClass(DbContextOptions<HRAppDBContextClass> options) : base(options)
        {
        }

        public DbSet<ClientDBContextClass> Clients { get; set; }  
        public DbSet<UserDBContextClass> Users { get; set; }
        public DbSet<EmployeeDBContextClass> Employees { get; set; }
        public DbSet<ProjectDBContextClass> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // relationships definitions
            modelBuilder.Entity<EmployeeDBContextClass>()
                .HasOne(e => e.Project) // Each Employee has one Project
                .WithMany(p => p.Employees) // Each Project can have many Employees
                .HasForeignKey(e => e.ProjectID); // Foreign Key defined by ProjectID

            modelBuilder.Entity<ClientDBContextClass>()
                .HasOne(c => c.Project) // Each Client has one Project
                .WithMany() // Assume no navigation property back to Clients from Project
                .HasForeignKey(c => c.ProjectID); // Foreign Key defined by ProjectID
        }
    }
}
