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
        public async Task<IEnumerable<Product>> getProducts(string? name, int? minPrice, int? maxPrice, int?[] categoryID, int? start, int? limit, string? orderby, string? dir)
        {
            IEnumerable<Product> products = await _productRepository.getProducts(name,minPrice,maxPrice,categoryID, start, limit, orderby, dir);
            return products;
        }

    }
}
