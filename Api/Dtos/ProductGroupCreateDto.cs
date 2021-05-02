namespace Api.Dtos
{
    public class ProductGroupCreateDto
    {
        public string Name { get; set; }
        public int? ParentId { get; set; }
    }
}