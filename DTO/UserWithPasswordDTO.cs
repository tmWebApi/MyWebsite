using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class UserWithPasswordDTO
    {
        [EmailAddress]
        public string UserName { get; set; } = null!;

        [StringLength(12, ErrorMessage = "Password length can't be more than 8.")]
        public string Password { get; set; } = null!;
        [StringLength(16, ErrorMessage = "Name length can't be more than 16.")]
        public string? FirstName { get; set; }
        [StringLength(15, ErrorMessage = "Name length can't be more than 12.")]
        public string? LastName { get; set; }
    }
}
