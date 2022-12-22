using Entities;

namespace Respository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>?> getProducts(string? name, int? minPrice, int? maxPrice, int?[] categoryID, int? start, int? limit, string? orderby, string? dir);
    }
}