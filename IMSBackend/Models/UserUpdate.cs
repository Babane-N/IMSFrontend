using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMSBackend.Models
{
    public class UserUpdate
    {
        public int id { get; set; }
        public string username { get; set; }
        public string? password { get; set; }
        public string role { get; set; }
        public DateTime created_at { get; set; }

    }
}
