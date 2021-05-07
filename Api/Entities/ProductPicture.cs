using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Entities
{
    public class ProductPicture
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public bool IsMain { get; set; }

        public string PublicId { get; set; }

        [ForeignKey(nameof(ProductId))]
        public Product Product { get; set; }

        public int ProductId { get; set; }
    }
}