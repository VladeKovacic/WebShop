using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Data.Migrations
{
    public partial class RemoveUsedFiledFromRefreshToken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Used",
                table: "RefreshToken");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Used",
                table: "RefreshToken",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
