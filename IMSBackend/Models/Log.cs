using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMSBackend.Models
{
    [Table("logs")]
    public class Log
    {
        [Key]
        public int id { get; set; }

        [Required]
        [StringLength(255)]
        public string action { get; set; }

        public int? user_id { get; set; }

        [Column(TypeName = "time")]
        public TimeSpan timestamp { get; set; }

        [ForeignKey("user_id")]
        public User user { get; set; }
    }
}
