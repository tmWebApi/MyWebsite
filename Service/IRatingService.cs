using Entities;

namespace Service
{
    public interface IRatingService
    {
        Task saveRating(Rating rating);
    }
}