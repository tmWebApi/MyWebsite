using AutoMapper;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Service;
using DTO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyWebsite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;
        public CategoryController(ICategoryService categoryService, IMapper mapper, ILogger<CategoryController> logger)
        {
            _categoryService = categoryService;
            _mapper = mapper;
            _logger = logger;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDTO>>> Get()
        {

            throw new NotImplementedException();
            IEnumerable<Category> categories = await _categoryService.getCategories();
            IEnumerable<CategoryDTO> categoriesDto = _mapper.Map<IEnumerable<Category>, IEnumerable<CategoryDTO>>(categories);
            return categories == null ? NotFound() : Ok(categoriesDto);

        }

    }
}
