using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Entities
{
    public partial class User
    {
        public User()
        {
            Orders = new HashSet<Order>();
        }

        public int UserId { get; set; }
        [EmailAddress]
        public string UserName { get; set; } = null!;

        [StringLength(12, ErrorMessage = "Password length can't be more than 8.")]
        public string Password { get; set; } = null!;
        [StringLength(8, ErrorMessage = "Name length can't be more than 8.")]
        public string? FirstName { get; set; }
        [StringLength(15, ErrorMessage = "Name length can't be more than 12.")]
        public string? LastName { get; set; }

        public virtual ICollection<Order>? Orders { get; set; }
    }
}
