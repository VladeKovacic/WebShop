using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Entities
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;

        public DateTime Modified { get; set; } = DateTime.UtcNow;

        public decimal Quantity { get; set; }

        public decimal Price { get; set; }

        public bool IsOnSale { get; set; }

        public decimal SalePercentage { get; set; }

        public int ProductGroupId { get; set; }
        
        
        [ForeignKey(nameof(ProductGroupId))]
        public ProductGroup ProductGroup { get; set; }

        public ICollection<ProductPicture> Pictures { get; set; }
    }
}