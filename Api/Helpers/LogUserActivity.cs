using System;
using System.Threading.Tasks;
using Api.Extensions;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            var userId = resultContext.HttpContext.User.GetUserId();
            var webShopDatabase = resultContext.HttpContext.RequestServices.GetService<IWebShopDatabase>();
            var user = await webShopDatabase.UserRepository.GetUserByIdAsync(userId);
            user.LastActive = DateTime.UtcNow;
            await webShopDatabase.CompleteAsync();
        }
    }
}