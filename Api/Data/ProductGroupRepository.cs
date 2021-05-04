using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Entities;
using Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class ProductGroupRepository : IProductGroupRepository
    {
        private readonly DataContext _context;
        public ProductGroupRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddProductGroupAsync(ProductGroup productGroup)
        {
            await _context.ProductGroups.AddAsync(productGroup);
        }

        public async Task<ICollection<ProductGroup>> GetProductGroupAsync(int? parentId = null)
        {
            return await _context.ProductGroups
                .Where(x => x.ParentId == parentId)
                .ToListAsync();
        }
    }
}