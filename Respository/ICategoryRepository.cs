using Entities;

namespace Respository
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> getCategories();
    }
}