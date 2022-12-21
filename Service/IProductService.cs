using Entities;

namespace Service
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> getProducts(int?[] categoryID, int? priceFrom, int? priceTo, int? start, int? limit, string orderby, string dir);
    }
}