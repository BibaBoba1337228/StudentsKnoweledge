using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentsKnoweledgeAPI.Migrations
{
    /// <inheritdoc />
    public partial class v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScheduleEntries_Schedules_ScheduleId",
                table: "ScheduleEntries");

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduleEntries_Schedules_ScheduleId",
                table: "ScheduleEntries",
                column: "ScheduleId",
                principalTable: "Schedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScheduleEntries_Schedules_ScheduleId",
                table: "ScheduleEntries");

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduleEntries_Schedules_ScheduleId",
                table: "ScheduleEntries",
                column: "ScheduleId",
                principalTable: "Schedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
