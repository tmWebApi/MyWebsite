using AutoMapper;
using DTO;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Service;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyWebsite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;
        public ProductController(IProductService productService,IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
            
        }

        // GET: api/<ProductController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> Get([FromQuery] string? name, [FromQuery] int? minPrice, [FromQuery] int? maxPrice, [FromQuery] int?[] categoryID, int? start = 1, int? limit = 10, string? orderby = "Name", string? dir = "ASC")
        {
            IEnumerable<Product>? products = await _productService.getProducts(name, minPrice, maxPrice,categoryID, start, limit, orderby, dir);
            if (products == null)
                return NoContent();
            IEnumerable<ProductDTO> productsDto = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductDTO>>(products);
            return Ok(productsDto);
        }


    }
}
