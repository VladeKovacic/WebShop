using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Api.Data;
using Api.Dtos;
using Api.Entities;
using Api.Helpers;
using Api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Api.Services
{
    public class AccountService : ServiceBase, IAccountService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenValidationParameters _tokenValidationParameters;
        private readonly IOptions<JwtSettings> _jwtSettings;
        private readonly IWebShopDatabase _webShopDatabase;

        public AccountService(UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager,
            IMapper mapper, 
            ErrorLocalizer errorLocalizer, 
            TokenValidationParameters tokenValidationParameters,
            IOptions<JwtSettings> jwtSettings,
            IWebShopDatabase webShopDatabase)
        : base(mapper, errorLocalizer)
        {
            _tokenValidationParameters = tokenValidationParameters;
            _jwtSettings = jwtSettings;
            _signInManager = signInManager;
            _userManager = userManager;
            _webShopDatabase = webShopDatabase;
        }

        public async Task<ServiceResult<UserDto>> LoginAsync(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return ReturnError("InvalidUsernameOrPassword");

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return ReturnError("InvalidUsernameOrPassword");

            return ReturnOk(await CreateToken(user));
        }

        public async Task<ServiceResult<UserDto>> RefreshAsync(RefreshDto refreshDto)
        {
            var validatedToken = GetClaimsPrincipalFromToken(refreshDto.Token);

            if(validatedToken == null) return ReturnError("InvalidToken");

            var expiryDateUnix = long.Parse(validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Exp).Value);

            var expiryDateTimeUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                .AddSeconds(expiryDateUnix);

            if(expiryDateTimeUtc > DateTime.UtcNow) return ReturnError("ThisTokenHasNotExpiredYet");

            var jti = validatedToken.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

            var storedRefreshToken = await _webShopDatabase.RefreshTokenRepository.GetRefreshTokenByIdAsync(refreshDto.RefreshToken);
            
            if(storedRefreshToken == null) return ReturnError("ThisRefreshTokenDoesNotExist");

            if(DateTime.UtcNow > storedRefreshToken.ExpiredDate) return ReturnError("ThisRefreshTokenHasExpired");

            if(storedRefreshToken.Invalidated) return ReturnError("InvalidRefreshToken");

            if(storedRefreshToken.JwtId != jti) return ReturnError("InvalidRefreshToken");

            _webShopDatabase.RefreshTokenRepository.RemoveRefreshToken(storedRefreshToken);
            await _webShopDatabase.CompleteAsync();

            var user = await _userManager.FindByIdAsync(validatedToken.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value);

            return ReturnOk(await CreateToken(user));
        }

        public async Task<ServiceResult<UserDto>> RegisterAsync(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return ReturnError("UsernameIsTaken");

            var user = Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();
            user.Locality = registerDto.Locality;

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return ReturnError(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return ReturnError(result.Errors);

            return ReturnOk(await CreateToken(user));
        }

        private async Task<UserDto> CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var roles = await _userManager.GetRolesAsync(user);

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
            claims.Add(new Claim(ClaimTypes.Locality, user.Locality ?? "en-EN"));

            var creds = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Value.Secret)), SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.Add(_jwtSettings.Value.TokenLifetime),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var refreshToken = new RefreshToken
            {
                JwtId = token.Id,
                UserId = user.Id,
                ExpiredDate = DateTime.UtcNow.AddMonths(6),
                Token = GenerateRefreshToken()
            };

            await _webShopDatabase.RefreshTokenRepository.AddRefreshTokenAsync(refreshToken);
            await _webShopDatabase.CompleteAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = tokenHandler.WriteToken(token),
                RefreshToken = refreshToken.Token
            };
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        private ClaimsPrincipal GetClaimsPrincipalFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var principle = tokenHandler.ValidateToken(token, _tokenValidationParameters, out var validatedToken);
                if(!IsJwtWithValidSecurityAlgorithm(validatedToken)) return null;
                else return principle;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private bool IsJwtWithValidSecurityAlgorithm(SecurityToken validatedToken)
        {
            return (validatedToken is JwtSecurityToken jwtSecurityToken) &&
                jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha512, System.StringComparison.InvariantCultureIgnoreCase);
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}