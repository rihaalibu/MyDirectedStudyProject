using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR_ClientManagement_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddDefaultEndDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "ProjectResourceAllocations",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "current_date + interval '90 days'",
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "EndDate",
                table: "ProjectResourceAllocations",
                type: "timestamp with time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldDefaultValueSql: "current_date + interval '90 days'");
        }
    }
}
