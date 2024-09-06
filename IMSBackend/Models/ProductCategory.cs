using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using IMSBackend.Models;

namespace IMSBackend.Models
{
    [Table("categories")]
    public class ProductCategory
    {
        [Key]
        public int id { get; set; }

        [Required]
        [StringLength(100)]
        public string name { get; set; }

        [StringLength(50)]
        public string description { get; set; }

        [Required]
        public DateTime created_at { get; set; }

        // Navigation property for inventory items
        public ICollection<InventoryItem> InventoryItems { get; set; }
    }
}
