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
        private readonly ShoppingWebsiteContext dbContext;
        public ProductRepository(ShoppingWebsiteContext salesWebsiteContext)
        {
            dbContext = salesWebsiteContext;
        }
        public async Task<IEnumerable<Product>> getProducts(int?[] categoryID, int? priceFrom, int? priceTo, int? start, int? limit, string orderby, string dir)
        {
            IEnumerable<Product> products = await dbContext.Products.ToArrayAsync();
            return products;
        }
    }
}
