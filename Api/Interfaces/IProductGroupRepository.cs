using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Entities;
using Api.Helpers;

namespace Api.Interfaces
{
    public interface IProductGroupRepository
    {
        Task AddProductGroupAsync(ProductGroup productGroup);

        Task<ICollection<ProductGroup>> GetProductGroupAsync(int? parentId = null);
        
        Task<ICollection<ProductGroupDto>> GetProductGroupDtoAsync(int? parentId);
    }
}