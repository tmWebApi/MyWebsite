using Entities;

namespace Respository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> getProducts(int?[] categoryID, int? priceFrom, int? priceTo, int? start, int? limit, string orderby, string dir);
    }
}