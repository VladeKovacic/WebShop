using System;

namespace Api.Dtos
{
    public class ProductUpdateDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public decimal Quantity { get; set; }

        public decimal Price { get; set; }

        public bool IsOnSale { get; set; }

        public decimal SalePercentage { get; set; }

        public int ProductGroupId { get; set; }
    }
}