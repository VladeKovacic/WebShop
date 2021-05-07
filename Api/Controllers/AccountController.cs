using System.Threading.Tasks;
using Api.Dtos;
using Api.Entities;
using Api.Errors;
using Api.Helpers;
using Api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IAccountService _accountService;
        private readonly ErrorLocalizer _errorLocalizer;
        public AccountController(IAccountService accountService, ErrorLocalizer errorLocalizer)
        {
            _accountService = accountService;
            _errorLocalizer = errorLocalizer;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var result = await _accountService.RegisterAsync(registerDto);

            if (result.HasError) return BadRequest(result.Exception);

            return Ok(result.Result);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            if (string.IsNullOrEmpty(loginDto.Password) || string.IsNullOrEmpty(loginDto.Username))
            {
                return Unauthorized(new ApiException("EmptyUsernameOrPassword", _errorLocalizer["EmptyUsernameOrPassword"]));
            }

            var result = await _accountService.LoginAsync(loginDto);

            if (result.HasError) return Unauthorized(result.Exception);

            return Ok(result.Result);
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<UserDto>> Refresh(RefreshDto refreshDto)
        {
            var result = await _accountService.RefreshAsync(refreshDto);

            if (result.HasError) return Unauthorized(result.Exception);

            return Ok(result.Result);
        }
    }
}