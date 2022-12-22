using Entities;

namespace Respository
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>?> getOrdersByUserId(int userId);
        Task<Order> saveOrder(Order order);
    }
}