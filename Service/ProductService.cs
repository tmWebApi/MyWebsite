using Entities;
using Respository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        public async Task<IEnumerable<Product>> getProducts(int?[] categoryID, int? priceFrom, int? priceTo, int? start, int? limit, string orderby, string dir)
        {
            IEnumerable<Product> products = await _productRepository.getProducts(categoryID, priceFrom, priceTo, start, limit, orderby, dir);
            return products;
        }

    }
}
