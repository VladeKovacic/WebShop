using System;
using System.Threading;
using System.Threading.Tasks;
using Api.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Api.BackgroundTasks
{
    public class CleanUpRefreshTokens : BackgroundService
    {
        private readonly ILogger<CleanUpRefreshTokens> _logger;
        private readonly IConfiguration _config;
        private readonly IServiceProvider _serviceProvider;

        public CleanUpRefreshTokens(IServiceProvider serviceProvider, ILogger<CleanUpRefreshTokens> logger, IConfiguration config)
        {
            _serviceProvider = serviceProvider;
            _config = config;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var webShopDatabase = scope.ServiceProvider.GetRequiredService<IWebShopDatabase>();

                    var result = webShopDatabase.RefreshTokenRepository.ClearExpiredRefreshTokens();

                    if (await webShopDatabase.CompleteAsync()) _logger.LogInformation($"{result} tokens are cleared");
                    else _logger.LogInformation("No tokens for clearing");

                    await Task.Delay(_config.GetValue<TimeSpan>("CleanUpRefreshTokensPeriod"));
                }
            }
        }
    }
}