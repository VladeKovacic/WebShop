using System;

namespace Api.Dtos
{
    public class ProductCreateDto
    {
        public string Name { get; set; }

        public decimal Quantity { get; set; }

        public decimal Price { get; set; }

        public int ProductGroupId { get; set; }
    }
}