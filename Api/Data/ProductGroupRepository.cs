using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Entities;
using Api.Helpers;
using Api.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class ProductGroupRepository : IProductGroupRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProductGroupRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
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

        public async Task<ICollection<ProductGroupDto>> GetProductGroupDtoAsync(int? parentId)
        {
            return await _context.ProductGroups
                .ProjectTo<ProductGroupDto>(_mapper.ConfigurationProvider)
                .Where(x => x.ParentId == parentId)
                .ToListAsync();
        }
    }
}