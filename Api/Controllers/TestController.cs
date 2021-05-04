using System.Threading.Tasks;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class TestController : BaseApiController
    {
        private readonly ICacheService _cacheService;

        public TestController(ICacheService cacheService)
        {
            _cacheService = cacheService;
        }

        [HttpGet("{key}")]
        public async Task<ActionResult<string>> GetCache(string key) 
        {
            var result = await _cacheService.GetCacheValueAsync(key);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult> SetCache(string key, string value) 
        {
            await _cacheService.SetCacheValueAsync(key, value);
            return Ok();
        }
    }
}