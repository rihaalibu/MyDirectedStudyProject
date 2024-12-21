using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HR_ClientManagement_WebAPI.Models
{
    public class HRAppDBContext : DbContext
    {
        public HRAppDBContext(DbContextOptions<HRAppDBContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<TechnicalResource> TechnicalResources { get; set; }
        public DbSet<ProjectResourceAllocation> ProjectResourceAllocations { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Project>()
                .HasOne(p => p.Client)
                .WithMany(c => c.Projects)
                .HasForeignKey(p => p.ClientId);


            modelBuilder.Entity<ProjectResourceAllocation>()
                .HasOne(pra => pra.Project)
                .WithMany(p => p.ResourceAllocations)
                .HasForeignKey(pra => pra.ProjectId);

            modelBuilder.Entity<ProjectResourceAllocation>()
                .HasOne(pra => pra.Resource)
                .WithMany(r => r.ProjectAllocations)
                .HasForeignKey(pra => pra.ResourceId);

            // modelBuilder.Entity<Project>()
            // .HasMany(p => p.Resource )
            // .WithMany(p => p.Project )
            // .UsingEntity<ProjectResourceAllocation>();

            modelBuilder.Entity<Client>()
                .HasMany(c => c.Projects)
                .WithOne(c => c.Client)
                .HasForeignKey(p => p.ClientId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ProjectResourceAllocation>().Property(pra => pra.StartDate).HasDefaultValueSql("current_date");
            modelBuilder.Entity<ProjectResourceAllocation>().Property(pra => pra.EndDate).HasDefaultValueSql("current_date + interval '90 days'");

        }
    }
}
