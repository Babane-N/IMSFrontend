using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMSBackend.Models
{
    [Table("promotions")]
    public class Promotion
    {
        [Key]
        public int id { get; set; }

        [StringLength(50)]
        public string code { get; set; }

        [StringLength(50)]
        public string description { get; set; }

        [Column(TypeName = "decimal(5,2)")]
        public decimal discount_percentage { get; set; }

        public DateTime? start_date { get; set; }

        public DateTime? end_date { get; set; }

        [Required]
        public DateTime created_at { get; set; }
    }
}

