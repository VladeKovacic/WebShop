using System.Threading.Tasks;
using Api.Interfaces;

namespace Api.Data
{
    public class WebShopDatabase : IWebShopDatabase
    {
        private readonly DataContext _context;
        public WebShopDatabase(DataContext context)
        {
            _context = context;
        }
        public IUserRepository UserRepository => new UserRepository(_context);
        public IProductGroupRepository ProductGroupRepository => new ProductGroupRepository(_context);
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