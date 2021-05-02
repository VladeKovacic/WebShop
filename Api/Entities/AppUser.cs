using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace Api.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Updated { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public ICollection<AppUserRole> UserRoles { get; set; }
        public string Locality { get; set; }
    }
}