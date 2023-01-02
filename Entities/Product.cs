﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Entities
{
    public partial class Product
    {
        public Product()
        {
            OrderItems = new HashSet<OrderItem>();
        }

        public int ProductId { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int CategoryId { get; set; }
        public int Price { get; set; }
        public string ImgUrl { get; set; } = null!;

        [JsonIgnore]
        public virtual Category? Category { get; set; } = null!;

        [JsonIgnore]
        public virtual ICollection<OrderItem>? OrderItems { get; set; }
    }
}
