using BusinessLogicLayer.DTOs.Product;
using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace StoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var products = await _productService.GetAllAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var product = await _productService.GetByIdAsync(id);
            if (product is null) return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateProductDto productDto)
        {
            var product = await _productService.CreateAsync(productDto);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _productService.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateProductDto productDto)
        {
            var product = await _productService.UpdateAsync(id, productDto);
            if (product is null) return NotFound();
            return Ok(product);
        }
    }
}
