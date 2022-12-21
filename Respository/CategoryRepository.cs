using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Respository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly SalesWebsiteContext dbContext;
        public CategoryRepository(SalesWebsiteContext salesWebsiteContext)
        {
            dbContext = salesWebsiteContext;
        }
        public async Task<IEnumerable<Category>> getCategories()
        {
            List<Category> categories = await dbContext.Categories.ToListAsync();
            return categories;
        }
    }


}
