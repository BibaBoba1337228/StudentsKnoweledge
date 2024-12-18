using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentsKnoweledgeAPI.Migrations
{
    /// <inheritdoc />
    public partial class v23 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isReaded",
                table: "Notifications",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isReaded",
                table: "Notifications");
        }
    }
}
