using System.Threading.Tasks;
using Api.Dtos;
using Api.Entities;
using Api.Helpers;
using Api.Interfaces;
using AutoMapper;

namespace Api.Services
{
    public class ProductService : ServiceBase, IProductService
    {
        private readonly IWebShopDatabase _webShopDatabase;
        public ProductService(IWebShopDatabase webShopDatabase, IMapper mapper, ErrorLocalizer errorLocalizer) : base(mapper, errorLocalizer)
        {
            _webShopDatabase = webShopDatabase;
        }

        public async Task<ServiceResult<ProductDto>> AddProductAsync(ProductCreateDto productCreateDto)
        {
             var product = Map<Product>(productCreateDto);

            await _webShopDatabase.ProductRepository.AddProductAsync(product);

            if (await _webShopDatabase.CompleteAsync()) return ReturnOk(Map<ProductDto>(product));

            return ReturnError("SavingProductToDatabaseNotSucceed");
        }

        public async Task<ServiceResult<bool>> DeleteProductAsync(int productId)
        {
           var product = await _webShopDatabase.ProductRepository.GetProductById(productId);

           if(product == null) return ReturnError("ProductNotFound");

            await _webShopDatabase.ProductRepository.DeleteProductAsync(product);

            if (await _webShopDatabase.CompleteAsync()) return ReturnOk(true);

            return ReturnError("DeletingProductFromDatabaseNotSucceed");
        }

        public async Task<ServiceResult<PagedList<ProductDto>>> GetProductsAsync(ProductParams productParams)
        {
            return ReturnOk(await _webShopDatabase.ProductRepository.GetProductsAsync(productParams));    
        }

        public async Task<ServiceResult<ProductDto>> UpdateProductAsync(ProductUpdateDto productUpdateDto)
        {
            var product = await _webShopDatabase.ProductRepository.GetProductById(productUpdateDto.Id);

            if(product == null) return ReturnError("ProductNotFound");

            Map<ProductUpdateDto, Product>(productUpdateDto, product);            

            await _webShopDatabase.ProductRepository.UpdateProductAsync(product);

            if (await _webShopDatabase.CompleteAsync()) return ReturnOk(Map<ProductDto>(product));

            return ReturnError("SavingProductToDatabaseNotSucceed");
        }
    }
}