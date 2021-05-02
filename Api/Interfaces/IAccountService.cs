using System.Threading.Tasks;
using Api.Dtos;
using Api.Helpers;

namespace Api.Interfaces
{
    public interface IAccountService
    {
        Task<ServiceResult<UserDto>> RegisterAsync(RegisterDto registerDto);
        Task<ServiceResult<UserDto>> LoginAsync(LoginDto loginDto);
        Task<ServiceResult<UserDto>> RefreshAsync(RefreshDto refreshDto);
    }
}