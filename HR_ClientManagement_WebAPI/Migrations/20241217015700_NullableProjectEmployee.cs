using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR_ClientManagement_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class NullableProjectEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Projects_ProjectID",
                table: "Employees");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectID",
                table: "Employees",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Projects_ProjectID",
                table: "Employees",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Projects_ProjectID",
                table: "Employees");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectID",
                table: "Employees",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Projects_ProjectID",
                table: "Employees",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ProjectId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
