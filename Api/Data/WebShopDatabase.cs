using System.Threading.Tasks;
using Api.Interfaces;
using AutoMapper;

namespace Api.Data
{
    public class WebShopDatabase : IWebShopDatabase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public WebShopDatabase(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public IUserRepository UserRepository => new UserRepository(_context);
        public IProductRepository ProductRepository => new ProductRepository(_context, _mapper);
        public IProductGroupRepository ProductGroupRepository => new ProductGroupRepository(_context, _mapper);
        public IRefreshTokenRepository RefreshTokenRepository => new RefreshTokenRepository(_context);

        public async Task<bool> CompleteAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            _context.ChangeTracker.DetectChanges();
            var changes = _context.ChangeTracker.HasChanges();

            return changes;
        }
    }
}