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
        private readonly SalesWebsiteContext dbContext;
        public OrderRepository(SalesWebsiteContext salesWebsiteContext)
        {
            dbContext = salesWebsiteContext;
        }
        public async Task<Order> createOrder(Order order)
        {
            await dbContext.Orders.AddAsync(order);
            await dbContext.SaveChangesAsync();
            return order;
        }
    }
}
