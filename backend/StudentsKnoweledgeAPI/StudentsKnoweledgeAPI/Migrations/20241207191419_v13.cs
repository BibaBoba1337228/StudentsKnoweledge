using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentsKnoweledgeAPI.Migrations
{
    /// <inheritdoc />
    public partial class v13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "StudentAnswers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "MarkTime",
                table: "StudentAnswers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "TeacherId",
                table: "StudentAnswers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comment",
                table: "StudentAnswers");

            migrationBuilder.DropColumn(
                name: "MarkTime",
                table: "StudentAnswers");

            migrationBuilder.DropColumn(
                name: "TeacherId",
                table: "StudentAnswers");
        }
    }
}
