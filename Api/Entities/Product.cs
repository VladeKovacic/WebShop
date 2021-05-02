using System;

namespace Api.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime Modified { get; set; } = DateTime.UtcNow;
        public decimal Quantity { get; set; }
    }
}