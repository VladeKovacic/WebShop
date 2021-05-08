using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Dtos;
using Api.Extensions;
using Api.Helpers;
using Api.Interfaces;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize(Policy = "RequireProductAdminRole")]
    public class ProductController : BaseApiController
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPut]
        public async Task<ActionResult<ProductDto>> AddProduct(ProductCreateDto productCreateDto)
        {
            if (productCreateDto == null || string.IsNullOrEmpty(productCreateDto.Name)) return BadRequest();

            var result = await _productService.AddProductAsync(productCreateDto);

            if (result.HasError) return BadRequest(result.Exception);

            return Ok(result.Result);
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> UpdateProduct(ProductUpdateDto productUpdateDto)
        {
            if (productUpdateDto == null || string.IsNullOrEmpty(productUpdateDto.Name) || productUpdateDto.Id <= 0) return BadRequest();

            var result = await _productService.UpdateProductAsync(productUpdateDto);

            if (result.HasError) return BadRequest(result.Exception);

            return Ok(result.Result);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts([FromQuery] ProductParams productParams)
        {
            if (productParams == null) return BadRequest();

            var result = await _productService.GetProductsAsync(productParams);

            if (result.HasError) return BadRequest(result.Exception);

            Response.AddPaginationHeader(result.Result.CurrentPage, result.Result.PageSize,
                result.Result.TotalCount, result.Result.TotalPages);

            return Ok(result.Result);
        }
    }
}