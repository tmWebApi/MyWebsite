using Entities;
using DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Service;
using System.Text.Json;
using AutoMapper;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyWebsite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<UserController> _logger;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper, ILogger<UserController> logger)
        {
            _userService = userService;
            _mapper = mapper;
            _logger = logger;
        }

        // GET: api/<UserControllers>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserWithoutPasswordDTO?>>> Get([FromQuery] string userName, [FromQuery] string password)
        {
            _logger.LogInformation($"login user {userName} ");

            User? user = await _userService.getUser(userName, password);
            if (user == null)
                return NoContent();
            UserWithoutPasswordDTO userWithoutPassword = _mapper.Map<User, UserWithoutPasswordDTO>(user);
            return  Ok(userWithoutPassword);


        }

        // POST api/<UserControllers>
        [HttpPost]
        public async Task<ActionResult<UserWithoutPasswordDTO>> Post([FromBody] UserWithPasswordDTO userWithPassword)
        {
            User user = _mapper.Map<UserWithPasswordDTO, User>(userWithPassword);
            User newUser = await _userService.createUser(user);
            UserWithoutPasswordDTO userWithoutPassword = _mapper.Map<User, UserWithoutPasswordDTO>(newUser);
            return CreatedAtAction(nameof(Get), new { id = user.UserId }, userWithoutPassword);

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
