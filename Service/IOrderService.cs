using Entities;

namespace Service
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>?> getOrdersByUserId(int userId);
        Task<Order> saveOrder(Order order);
    }
}