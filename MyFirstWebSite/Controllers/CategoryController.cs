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
        public CategoryController(ICategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDTO>>> Get()
        {
            IEnumerable<Category> categories = await _categoryService.getCategories();
            IEnumerable<CategoryDTO> categoriesDto =  _mapper.Map<IEnumerable<Category>, IEnumerable<CategoryDTO>>(categories);
            return categories == null ? NotFound() : Ok(categoriesDto);
        }

    }
}
