using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class Seed
    {
        public static async Task SeedRoles(RoleManager<AppRole> roleManager)
        {
            if(await roleManager.Roles.AnyAsync(x => x.Name == "ProductAdmin")) return;

            await roleManager.CreateAsync(new AppRole {Name = "ProductAdmin"});

            if (await roleManager.Roles.AnyAsync()) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
        }

        public static async Task SeedAdminUser(UserManager<AppUser> userManager) 
        {
            var adminUser = await userManager.Users.SingleOrDefaultAsync(x => x.UserName == "admin");
            if(adminUser != null) return;

            adminUser = new AppUser {
                UserName = "admin",
                Locality = "en-EN"
            };

            var result = await userManager.CreateAsync(adminUser, "Pa$$w0rd");

            if (!result.Succeeded) throw new System.Exception("Method CreateUserAsync failed while trying to create an admin user.");

            var roleResult = await userManager.AddToRoleAsync(adminUser, "Admin");

            if (!roleResult.Succeeded) throw new System.Exception("Method AddToRoleAsync failed while trying to add an admin user in 'Admin' role.");
        }
    }
}