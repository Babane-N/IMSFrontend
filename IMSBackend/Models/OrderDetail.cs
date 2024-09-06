using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMSBackend.Models
{
    [Table("order_details")]
    public class OrderDetail
    {
        [Key]
        public int id { get; set; }

        public int order_id { get; set; }

        public int inventory_id { get; set; }

        [Required]
        public int quantity { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal price { get; set; }

        [ForeignKey("order_id")]
        public Order Order { get; set; }

        [ForeignKey("id")]
        public InventoryItem InventoryItem { get; set; }
    }
}

