using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Entities
{
    public class RefreshToken
    {
        [Key]
        public string Token { get; set; }

        public string JwtId { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;

        public DateTime ExpiredDate { get; set; }

        public bool Invalidated { get; set; }

        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public AppUser User { get; set; }
    }
}