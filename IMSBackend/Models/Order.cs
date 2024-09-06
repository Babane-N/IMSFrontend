using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMSBackend.Models
{
    [Table("orders")]
    public class Order
    {
        [Key]
        public int id { get; set; }

        public int customer_id { get; set; }

        [Column(TypeName = "date")]
        public DateTime order_date { get; set; }

        [Required]
        [StringLength(20)]
        public string status { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal total { get; set; }

        [ForeignKey("id")]
        public Customer customer { get; set; }

        // Navigation property for order details
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}

