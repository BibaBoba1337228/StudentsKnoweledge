using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public DbSet<Student> Students { get; set; }
    public DbSet<Teacher> Teachers { get; set; }
    public DbSet<Administrator> Administrators { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<AppUser>()
            .HasDiscriminator<UserRole>("Role")
            .HasValue<AppUser>(UserRole.None)
            .HasValue<Student>(UserRole.Student)
            .HasValue<Teacher>(UserRole.Teacher)
            .HasValue<Administrator>(UserRole.Admin);

        modelBuilder.Entity<AppUser>()
            .Property(u => u.Role)
            .HasConversion<string>();
    }
}
