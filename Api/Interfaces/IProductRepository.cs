using System.Threading.Tasks;
using Api.Dtos;
using Api.Entities;
using Api.Helpers;

namespace Api.Interfaces
{
    public interface IProductRepository
    {
        Task AddProductAsync(Product product);

        Task UpdateProductAsync(Product product);

        Task<Product> GetProductById(int productId);

        Task<PagedList<ProductDto>> GetProductsAsync(ProductParams productParams);
    }
}