using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Entities;

namespace Api.Interfaces
{
    public interface IProductGroupRepository
    {
        Task AddProductGroupAsync(ProductGroup productGroup);

        Task<ICollection<ProductGroup>> GetProductGroupAsync(int? parentId = null);
    }
}