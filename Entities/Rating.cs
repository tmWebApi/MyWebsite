﻿using System;
using System.Collections.Generic;

namespace Entities
{
    public partial class Rating
    {
        public int RatingId { get; set; }
        public int UserId { get; set; }
        public string? Host { get; set; }
        public string? Method { get; set; }
        public string? Path { get; set; }
        public string? Referer { get; set; }
        public string? UserAgent { get; set; }
        public DateTime? RecordoDate { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
