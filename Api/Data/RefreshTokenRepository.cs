using System.Threading.Tasks;
using Api.Entities;
using Api.Interfaces;

namespace Api.Data
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly DataContext _context;
        public RefreshTokenRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddRefreshTokenAsync(RefreshToken refreshToken)
        {
            await _context.RefreshToken.AddAsync(refreshToken);
        }

        public async Task<RefreshToken> GetRefreshTokenByIdAsync(string refreshToken)
        {
            return await _context.RefreshToken.FindAsync(refreshToken);
        }

        public void RemoveRefreshToken(RefreshToken refreshToken)
        {
            _context.RefreshToken.Remove(refreshToken);
        }
    }
}