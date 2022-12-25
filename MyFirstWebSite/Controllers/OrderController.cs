using Entities;
using Microsoft.AspNetCore.Mvc;
using Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyWebsite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        // GET: api/<OrderController>/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<IEnumerable<Order>?>> GetOrderByUserId(int id)
        //{
        //    IEnumerable<Order>? ordersUser = await _orderService.getOrdersByUserId(id);
        //    return ordersUser == null ? NoContent() : Ok(ordersUser);
        //}


        // POST api/<OrderController>
        [HttpPost]
        public async Task<ActionResult<Order>> Post([FromBody] Order order)
        {
            Order newOrder = await _orderService.saveOrder(order);
            return newOrder;
        }

    }
}
