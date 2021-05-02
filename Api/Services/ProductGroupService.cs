using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Entities;
using Api.Helpers;
using Api.Interfaces;
using AutoMapper;

namespace Api.Services
{
    public class ProductGroupService : ServiceBase, IProductGroupService
    {
        private readonly IWebShopDatabase _webShopDatabase;
        public ProductGroupService(IWebShopDatabase webShopDatabase, IMapper mapper, ErrorLocalizer errorLocalizer)
        : base(mapper, errorLocalizer)
        {
            _webShopDatabase = webShopDatabase;
        }

        public async Task<ServiceResult<ProductGroupDto>> AddProductGroupAsync(ProductGroupCreateDto productGroupCreateDto)
        {
            var productGroup = Map<ProductGroup>(productGroupCreateDto);

            await _webShopDatabase.ProductGroupRepository.AddProductGroupAsync(productGroup);

            if (await _webShopDatabase.CompleteAsync()) return ReturnOk(Map<ProductGroupDto>(productGroup));

            return ReturnError("SavingProductGroupToDatabaseNotSucceed");
        }

        public async Task<ServiceResult<ICollection<ProductGroup>>> GetProductGroupTreeAsync()
        {
            return ReturnOk(await _webShopDatabase.ProductGroupRepository.GetProductGroupTreeAsync());
        }
    }
}