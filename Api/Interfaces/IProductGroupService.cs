using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Entities;
using Api.Helpers;

namespace Api.Interfaces
{
    public interface IProductGroupService
    {
        Task<ServiceResult<ProductGroupDto>> AddProductGroupAsync(ProductGroupCreateDto productGroupCreateDto);
        
        Task<ServiceResult<ICollection<ProductGroup>>> GetProductGroupTreeAsync();
    }
}