using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Service;
using System.Text.Json;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyWebsite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/<UserControllers>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User?>>> Get([FromQuery] string userName, [FromQuery] string password)
        {
           
            User? user = await _userService.getUser(userName, password);
            return user == null ? NotFound() : Ok(user);
        }

        // POST api/<UserControllers>
        [HttpPost]
        public async Task<ActionResult<User>> Post([FromBody] User user)
        {
            User newUser = await _userService.createUser(user);
            return CreatedAtAction(nameof(Get), new { id = user.UserId }, newUser);

        }

        // PUT api/<UserControllers>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] User updateUser)
        {
             await _userService.updateUser(id, updateUser);

        }

        // DELETE api/<UserControllers>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _userService.deleteUser(id);
        }
    }
}
