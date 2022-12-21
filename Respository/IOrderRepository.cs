using Entities;

namespace Respository
{
    public interface IOrderRepository
    {
        Task<Order> saveOrder(Order order);
    }
}