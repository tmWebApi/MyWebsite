using Microsoft.AspNetCore.Mvc;
using Service;
using Zxcvbn;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyFirstWebSite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly IPasswordService _servicePassword;
        public PasswordController(IPasswordService servicePassword)
        {
            _servicePassword = servicePassword;
        }
        
        // POST api/<PasswordController>/validate
        [HttpPost("validate")]
        public int Post([FromBody] string password)
        {
            return _servicePassword.checkPassword(password);
        }

    }
}
