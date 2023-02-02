using Entities;

namespace Respository
{
    public interface IRatingRepository
    {
        string _connectionString { get; set; }

        Task saveRating(Rating rating);
    }
}