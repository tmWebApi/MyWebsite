using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Respository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ShoppingWebsiteContext _dbContext;
        public OrderRepository(ShoppingWebsiteContext salesWebsiteContext)
        {
            _dbContext = salesWebsiteContext;
        }
        public async Task<IEnumerable<Order>?> getOrdersByUserId(int userId)
        {
            var query = _dbContext.Orders.Where(o => o.UserId == userId);
            IEnumerable<Order> ordersUser = await query.ToArrayAsync();
            return ordersUser.Count() > 1 ? ordersUser : null;
        }
        public async Task<Order> saveOrder(Order order)
        {
            await _dbContext.Orders.AddAsync(order);
            await _dbContext.SaveChangesAsync();
            return order;
        }
    }
}
