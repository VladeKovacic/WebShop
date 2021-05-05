using System;
using Api.BackgroundTasks;
using Api.Data;
using Api.Helpers;
using Api.Interfaces;
using Api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

namespace Api.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddHostedService<RedisSubscriber>();
            services.AddHostedService<CleanUpRefreshTokens>();
            services.AddSingleton<ErrorLocalizer>();
            services.AddSingleton<IConnectionMultiplexer>(x =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                if (env == "Development")
                {
                    return ConnectionMultiplexer.Connect(config.GetValue<string>("REDISCLOUD_URL"));
                }
                else
                {
                    var tokens = config["REDISCLOUD_URL"].Split(':', '@');
                    return ConnectionMultiplexer.Connect(string.Format("{0}:{1},password={2}", tokens[3], tokens[4], tokens[2]));
                }
            });
            services.AddSingleton<ICacheService, RedisCacheService>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.Configure<JwtSettings>(config.GetSection(JwtSettings.JwtSettingsSectionName));
            services.Configure<CloudinarySettings>(config.GetSection(CloudinarySettings.CloudinarySettingsSectionName));
            services.AddScoped<IWebShopDatabase, WebShopDatabase>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IProductGroupService, ProductGroupService>();
            services.AddScoped<LogUserActivity>();
            services.AddDbContext<DataContext>(options =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                string connStr;

                // Depending on if in development or production, use either Heroku-provided
                // connection string, or development connection string from env var.
                if (env == "Development")
                {
                    // Use connection string from file.
                    connStr = config.GetConnectionString("DefaultConnection");
                }
                else
                {
                    // Use connection string provided at runtime by Heroku.
                    var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                    // Parse connection URL to connection string for Npgsql
                    connUrl = connUrl.Replace("postgres://", string.Empty);
                    var pgUserPass = connUrl.Split("@")[0];
                    var pgHostPortDb = connUrl.Split("@")[1];
                    var pgHostPort = pgHostPortDb.Split("/")[0];
                    var pgDb = pgHostPortDb.Split("/")[1];
                    var pgUser = pgUserPass.Split(":")[0];
                    var pgPass = pgUserPass.Split(":")[1];
                    var pgHost = pgHostPort.Split(":")[0];
                    var pgPort = pgHostPort.Split(":")[1];

                    connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}; SSL Mode=Require; Trust Server Certificate=true";
                }

                // Whether the connection string came from the local development configuration file
                // or from the environment variable from Heroku, use it to set up your DbContext.
                options.UseNpgsql(connStr);
            });

            return services;
        }
    }
}