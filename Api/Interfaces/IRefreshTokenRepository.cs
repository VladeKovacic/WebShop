using System.Threading.Tasks;
using Api.Entities;

namespace Api.Interfaces
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken> GetRefreshTokenByIdAsync(string refreshToken);
        void RemoveRefreshToken(RefreshToken refreshToken);
        Task AddRefreshTokenAsync(RefreshToken refreshToken);
    }
}