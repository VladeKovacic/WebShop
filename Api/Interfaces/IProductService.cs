using System.Threading.Tasks;
using Api.Dtos;
using Api.Helpers;

namespace Api.Interfaces
{
    public interface IProductService
    {
        Task<ServiceResult<ProductDto>> AddProductAsync(ProductCreateDto productCreateDto);

        Task<ServiceResult<ProductDto>> UpdateProductAsync(ProductUpdateDto productUpdateDto);

        Task<ServiceResult<PagedList<ProductDto>>> GetProductsAsync(ProductParams productParams);
    }
}