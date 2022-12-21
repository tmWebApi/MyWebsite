using Entities;

namespace Respository
{
    public interface IOrderRepository
    {
        Task<Order> createOrder(Order order);
    }
}