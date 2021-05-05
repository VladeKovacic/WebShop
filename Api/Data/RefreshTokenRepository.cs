using System;
using System.Linq;
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
            await _context.RefreshTokens.AddAsync(refreshToken);
        }

        public int ClearExpiredRefreshTokens()
        {
            var tokensForDeletion = _context.RefreshTokens.Where(c => c.ExpiredDate <= DateTime.Now || c.Invalidated).ToList();
            _context.RefreshTokens.RemoveRange(tokensForDeletion);

            return tokensForDeletion.Count;
        }

        public async Task<RefreshToken> GetRefreshTokenByIdAsync(string refreshToken)
        {
            return await _context.RefreshTokens.FindAsync(refreshToken);
        }

        public void RemoveRefreshToken(RefreshToken refreshToken)
        {
            _context.RefreshTokens.Remove(refreshToken);
        }
    }
}