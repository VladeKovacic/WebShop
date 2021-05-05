using System;
using System.Text.Json;
using System.Threading.Tasks;
using Api.Interfaces;
using StackExchange.Redis;

namespace Api.Services
{
    public class RedisCacheService : ICacheService
    {
        private readonly IConnectionMultiplexer _connectionMultiplexer;

        public RedisCacheService(IConnectionMultiplexer connectionMultiplexer)
        {
            _connectionMultiplexer = connectionMultiplexer;
        }

        public async Task<T> GetSetFromCache<T>(string key, Func<Task<T>> setCallback)
        {
            var db = _connectionMultiplexer.GetDatabase();
            var result = await db.StringGetAsync(key);

            T value;

            if (!result.HasValue)
            {
                value = await setCallback();

                await db.StringSetAsync(key, JsonSerializer.Serialize(value), expiry:new TimeSpan(0, 0, 30));
            }
            else
            {
                value = JsonSerializer.Deserialize<T>(result.ToString());
            }

            return value;
        }

        public async Task<string> GetCacheValueAsync(string key)
        {
            var db = _connectionMultiplexer.GetDatabase();
            return await db.StringGetAsync(key);
        }

        public async Task SetCacheValueAsync(string key, string value)
        {
            var db = _connectionMultiplexer.GetDatabase();
            await db.StringSetAsync(key, value);
        }
    }
}