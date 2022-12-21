using Entities;
using Respository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        public async Task<IEnumerable<Category>> getCategories()
        {
            IEnumerable<Category> categories = await _categoryRepository.getCategories();
            //if (categories == null)
            //    return null;
            return categories;
        }
    }
}
