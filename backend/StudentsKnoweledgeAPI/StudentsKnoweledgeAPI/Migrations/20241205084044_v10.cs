using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentsKnoweledgeAPI.Migrations
{
    /// <inheritdoc />
    public partial class v10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentAnswer_AspNetUsers_StudentId",
                table: "StudentAnswer");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentAnswer_Materials_MaterialId",
                table: "StudentAnswer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentAnswer",
                table: "StudentAnswer");

            migrationBuilder.RenameTable(
                name: "StudentAnswer",
                newName: "StudentAnswers");

            migrationBuilder.RenameIndex(
                name: "IX_StudentAnswer_StudentId",
                table: "StudentAnswers",
                newName: "IX_StudentAnswers_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentAnswer_MaterialId",
                table: "StudentAnswers",
                newName: "IX_StudentAnswers_MaterialId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentAnswers",
                table: "StudentAnswers",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    OpenDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CloseDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Events_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_CourseId",
                table: "Events",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAnswers_AspNetUsers_StudentId",
                table: "StudentAnswers",
                column: "StudentId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAnswers_Materials_MaterialId",
                table: "StudentAnswers",
                column: "MaterialId",
                principalTable: "Materials",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentAnswers_AspNetUsers_StudentId",
                table: "StudentAnswers");

            migrationBuilder.DropForeignKey(
                name: "FK_StudentAnswers_Materials_MaterialId",
                table: "StudentAnswers");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StudentAnswers",
                table: "StudentAnswers");

            migrationBuilder.RenameTable(
                name: "StudentAnswers",
                newName: "StudentAnswer");

            migrationBuilder.RenameIndex(
                name: "IX_StudentAnswers_StudentId",
                table: "StudentAnswer",
                newName: "IX_StudentAnswer_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_StudentAnswers_MaterialId",
                table: "StudentAnswer",
                newName: "IX_StudentAnswer_MaterialId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StudentAnswer",
                table: "StudentAnswer",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAnswer_AspNetUsers_StudentId",
                table: "StudentAnswer",
                column: "StudentId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentAnswer_Materials_MaterialId",
                table: "StudentAnswer",
                column: "MaterialId",
                principalTable: "Materials",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
