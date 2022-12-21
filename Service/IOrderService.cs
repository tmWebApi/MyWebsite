using Entities;

namespace Service
{
    public interface IOrderService
    {
        Task<Order> saveOrder(Order order);
    }
}