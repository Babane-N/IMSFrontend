using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMSBackend.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string username { get; set; }

        [Required]
        [StringLength(255)]
        public string password { get; set; }

        [Required]
        [StringLength(20)]
        public string role { get; set; }

        [Required]
        public DateTime created_at { get; set; }

        // Navigation property for logs
        public ICollection<Log> Logs { get; set; }
    }
}

