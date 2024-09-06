using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMSBackend.Models
{
    [Table("stock_movements")]
    public class StockMovement
    {
        [Key]
        public int id { get; set; }

        public int inventory_id { get; set; }

        [Required]
        [StringLength(20)]
        public string movement_type { get; set; }

        [Required]
        public int quantity { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime movement_date { get; set; }

        [StringLength(70)]
        public string reason { get; set; }

        [ForeignKey("id")]
        public InventoryItem InventoryItem { get; set; }
    }
}

