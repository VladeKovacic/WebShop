using System;
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
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProductRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task AddProductAsync(Product product)
        {
            await _context.Products.AddAsync(product);
        }

        public Task DeleteProductAsync(Product product)
        {
            _context.Products.Remove(product);
            return Task.CompletedTask;
        }

        public async Task<Product> GetProductById(int productId)
        {
            return await _context.Products.FindAsync(productId);
        }

        public async Task<PagedList<ProductDto>> GetProductsAsync(ProductParams productParams)
        {
            var query = _context.Products
                .AsNoTracking()
                .OrderByDescending(m => m.Modified)
                .ProjectTo<ProductDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

            query = query.Where(p => EF.Functions.Like(p.Name, $"%{productParams.SearchString}%"));

            return await PagedList<ProductDto>.CreateAsync(query, productParams.PageNumber, productParams.PageSize);
        }

        public Task UpdateProductAsync(Product product)
        {
            product.Modified = DateTime.UtcNow;
            _context.Products.Update(product);
            return Task.CompletedTask;
        }
    }
}