using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Api.Entities
{
    public class ProductGroup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ProductGroup Parent { get; set; }
        public int? ParentId { get; set; }
        [JsonIgnore]
        public ICollection<ProductGroup> SubProductGroups { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime Modified { get; set; } = DateTime.UtcNow;
    }
}