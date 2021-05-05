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
        private readonly ICacheService _cacheService;
        public ProductGroupService(
            IWebShopDatabase webShopDatabase,
            IMapper mapper,
            ErrorLocalizer errorLocalizer,
            ICacheService cacheService
        )
        : base(mapper, errorLocalizer)
        {
            _webShopDatabase = webShopDatabase;
            _cacheService = cacheService;
        }

        public async Task<ServiceResult<ProductGroupDto>> AddProductGroupAsync(ProductGroupCreateDto productGroupCreateDto)
        {
            var productGroup = Map<ProductGroup>(productGroupCreateDto);

            await _webShopDatabase.ProductGroupRepository.AddProductGroupAsync(productGroup);

            if (await _webShopDatabase.CompleteAsync()) return ReturnOk(Map<ProductGroupDto>(productGroup));

            return ReturnError("SavingProductGroupToDatabaseNotSucceed");
        }

        public async Task<ServiceResult<ICollection<ProductGroupTreeDto>>> GetProductGroupTreeAsync()
        {
            ICollection<ProductGroupTreeDto> productGroupTreeDtoCollection =
                await _cacheService.GetSetFromCache<ICollection<ProductGroupTreeDto>>(
                    typeof(ProductGroupTreeDto).Name,
                    () =>
                    {
                        return GetProductGroupAsync(null);
                    });

            return ReturnOk(productGroupTreeDtoCollection);
        }

        private async Task<ICollection<ProductGroupTreeDto>> GetProductGroupAsync(int? parentId = null)
        {
            var rootProductGroups = Map<ICollection<ProductGroupTreeDto>>(await _webShopDatabase.ProductGroupRepository.GetProductGroupAsync(parentId));

            foreach (var productGroup in rootProductGroups)
            {
                var subProductGroup = await GetProductGroupAsync(productGroup.Id);
                productGroup.SubProductGroups = subProductGroup;
            }
            return rootProductGroups;
        }
    }
}