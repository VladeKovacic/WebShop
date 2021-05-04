using System.Collections.Generic;

namespace Api.Dtos
{
    public class ProductGroupTreeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<ProductGroupTreeDto> SubProductGroups { get; set; }
    }
}