using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Entities;
using Api.Helpers;
using Api.Interfaces;
using AutoMapper;
using StackExchange.Redis;

namespace Api.Services
{
    public class ProductGroupService : ServiceBase, IProductGroupService
    {
        private readonly IWebShopDatabase _webShopDatabase;
        private readonly IConnectionMultiplexer _connectionMultiplexer;
        public ProductGroupService(
            IWebShopDatabase webShopDatabase,
            IMapper mapper,
            ErrorLocalizer errorLocalizer,
            IConnectionMultiplexer connectionMultiplexer
        )
        : base(mapper, errorLocalizer)
        {
            _webShopDatabase = webShopDatabase;
            _connectionMultiplexer = connectionMultiplexer;
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
            var db = _connectionMultiplexer.GetDatabase();
            var result = await db.StringGetAsync(typeof(ProductGroupTreeDto).Name);

            ICollection<ProductGroupTreeDto> productGroupTreeDtoCollection;

            if (!result.HasValue)
            {
                productGroupTreeDtoCollection = await GetProductGroupAsync(null);

                await db.StringSetAsync(typeof(ProductGroupTreeDto).Name, JsonSerializer.Serialize(productGroupTreeDtoCollection), expiry:new TimeSpan(0, 0, 30));
            }
            else
            {
                productGroupTreeDtoCollection = JsonSerializer.Deserialize<ICollection<ProductGroupTreeDto>>(result.ToString());
            }

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