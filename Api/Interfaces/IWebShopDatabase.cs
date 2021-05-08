using System.Threading.Tasks;

namespace Api.Interfaces
{
    public interface IWebShopDatabase
    {
        IUserRepository UserRepository {get; }
        IProductRepository ProductRepository {get; }
        IProductGroupRepository ProductGroupRepository {get; }
        IRefreshTokenRepository RefreshTokenRepository {get; }
        Task<bool> CompleteAsync();
        bool HasChanges();
    }
}