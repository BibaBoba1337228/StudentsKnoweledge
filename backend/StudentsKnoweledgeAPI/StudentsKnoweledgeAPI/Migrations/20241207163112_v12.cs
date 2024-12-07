using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentsKnoweledgeAPI.Migrations
{
    /// <inheritdoc />
    public partial class v12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "OpenTime",
                table: "Materials",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OpenTime",
                table: "Materials");
        }
    }
}
