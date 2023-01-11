using AutoMapper;
using DTO;
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
        private readonly IMapper _mapper;
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
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
        public async Task<ActionResult<OrderDTO>> Post([FromBody] OrderDTO orderDto)
        {
            Order order = _mapper.Map<OrderDTO, Order>(orderDto);
            Order newOrder = await _orderService.saveOrder(order);
            OrderDTO newOrderDto = _mapper.Map<Order, OrderDTO>(newOrder);
            return newOrderDto;
        }

    }
}
