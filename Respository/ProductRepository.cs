using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Respository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ShoppingWebsiteContext _dbContext;
        public ProductRepository(ShoppingWebsiteContext salesWebsiteContext)
        {
            _dbContext = salesWebsiteContext;
        }
        public async Task<IEnumerable<Product>?> getProducts(string? name, int? minPrice, int? maxPrice, int?[] categoryID, int? start, int? limit, string? orderby, string? dir)
        {
            var query = _dbContext.Products
                .Where(product =>
            (name == null ? true : (product.Name.Contains(name)))
            && (minPrice == null ? true : (product.Price >= minPrice))
            && (maxPrice == null ? true : (product.Price <= maxPrice))
            && ((categoryID.Length == 0) ? true : categoryID.Contains(product.CategoryId))
            );
            IEnumerable<Product> products = await query.ToArrayAsync();
            return products.Count() <1 ? null: products;
        }
    }
}
