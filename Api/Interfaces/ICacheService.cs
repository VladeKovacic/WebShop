using System;
using System.Threading.Tasks;

namespace Api.Interfaces
{
    public interface ICacheService
    {
        Task<string> GetCacheValueAsync(string key);
        Task SetCacheValueAsync(string key, string value);
        Task<T> GetSetFromCache<T>(string key, Func<Task<T>> setCallback);
    }
}