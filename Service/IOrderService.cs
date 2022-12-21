using Entities;

namespace Service
{
    public interface IOrderService
    {
        Task<Order> createOrder(Order order);
    }
}