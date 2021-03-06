using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Entities;
using Api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize(Policy = "RequireProductAdminRole")]
    public class ProductGroupController : BaseApiController
    {
        private readonly IProductGroupService _productGroupService;
        public ProductGroupController(IProductGroupService productGroupService)
        {
            _productGroupService = productGroupService;
        }

        [AllowAnonymous]
        [HttpGet("tree")]
        public async Task<ActionResult<ICollection<ProductGroupTreeDto>>> GetProductGroupTree()
        {
            var result = await _productGroupService.GetProductGroupTreeAsync();

            if (result.HasError) return BadRequest(result.Exception);

            return Ok(result.Result);
        }

        [AllowAnonymous]
        [HttpGet("{parentId?}")]
        public async Task<ActionResult<ICollection<ProductGroupTreeDto>>> GetProductGroup(int? parentId = null)
        {
            var result = await _productGroupService.GetProductGroupAsync(parentId);

            if (result.HasError) return BadRequest(result.Exception);

            return Ok(result.Result);
        }

        [HttpPut]
        public async Task<ActionResult<ProductGroupDto>> AddProductGroup(ProductGroupCreateDto productGroupCreateDto)
        {
            if (productGroupCreateDto == null || string.IsNullOrEmpty(productGroupCreateDto.Name)) return BadRequest();

            var result = await _productGroupService.AddProductGroupAsync(productGroupCreateDto);

            if (result.HasError) return BadRequest(result.Exception);

            return Ok(result.Result);
        }
    }
}