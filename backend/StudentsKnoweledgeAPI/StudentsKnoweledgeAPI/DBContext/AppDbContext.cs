using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StudentsKnoweledgeAPI.Models;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public DbSet<Student> Students { get; set; }
    public DbSet<Teacher> Teachers { get; set; }
    public DbSet<Administrator> Administrators { get; set; }
    public DbSet<Group> Groups { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Section> Sections { get; set; }
    public DbSet<Material> Materials { get; set; }

    public DbSet<Message> Messages { get; set; }

    public DbSet<Chat> Chats { get; set; }

    public DbSet<StudentAnswer> StudentAnswers { get; set; }

    public DbSet<Event> Events { get; set; }

    public DbSet<Notification> Notifications { get; set; }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<AppUser>()
            .HasDiscriminator<UserRole>("Role")
            .HasValue<AppUser>(UserRole.None)
            .HasValue<Student>(UserRole.Student)
            .HasValue<Teacher>(UserRole.Teacher)
            .HasValue<Administrator>(UserRole.Admin)
            .HasValue<StudingUser>(UserRole.StudingUser);

        modelBuilder.Entity<AppUser>()
            .Property(u => u.Role)
            .HasConversion<string>();

        modelBuilder.Entity<Student>()
                .HasOne(s => s.Group)
                .WithMany(g => g.Students)
                .HasForeignKey(s => s.GroupId)
                .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Course>()
                .HasMany(c => c.Teachers)
                .WithMany(t => t.Courses);


        modelBuilder.Entity<Section>()
                .HasOne(s => s.Course)
                .WithMany(c => c.Sections)
                .HasForeignKey(s => s.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Material>()
                .HasOne(m => m.Section)
                .WithMany(s => s.Materials)
                .HasForeignKey(m => m.SectionId)
                .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Material>()
                .HasDiscriminator<string>("Type")
                .HasValue<TaskMaterial>("Task")
                .HasValue<FileMaterial>("File")
                .HasValue<TextContentMaterial>("TextContent");

        modelBuilder.Entity<Chat>()
            .HasMany(c => c.Users)
            .WithMany(u => u.Chats)
            .UsingEntity(j => j.ToTable("ChatUsers"));

        modelBuilder.Entity<Message>()
            .HasOne(m => m.Chat)
            .WithMany(c => c.Messages)
            .HasForeignKey(m => m.ChatId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Message>()
            .HasOne(m => m.Sender)
            .WithMany()
            .HasForeignKey(m => m.SenderId)
            .OnDelete(DeleteBehavior.Restrict);


        modelBuilder.Entity<StudentAnswer>()
            .HasOne(sa => sa.Material)
            .WithMany(tm => tm.Answers)
            .HasForeignKey(sa => sa.MaterialId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<StudentAnswer>()
            .HasOne(sa => sa.Student)
            .WithMany()
            .HasForeignKey(sa => sa.StudentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Event>()
            .HasOne(e => e.Course)
            .WithMany(c => c.Events)
            .HasForeignKey(e => e.CourseId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Notification>()
            .HasOne(n => n.StudingUser)
            .WithMany(u => u.Notifications)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade);


        modelBuilder.Entity<Notification>()
            .HasOne(n => n.StudingUser)
            .WithMany(u => u.Notifications)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade);




    }
}
