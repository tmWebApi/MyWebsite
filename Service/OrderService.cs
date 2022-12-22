using Entities;
using Microsoft.EntityFrameworkCore;
using Respository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<IEnumerable<Order>?> getOrdersByUserId(int userId)
        {
            IEnumerable<Order>? ordersUser = await _orderRepository.getOrdersByUserId(userId);
            return ordersUser;
        }
        public async Task<Order> saveOrder(Order order)
        {
            Order newOrder = await _orderRepository.saveOrder(order);
            return newOrder;
        }
    }
}
