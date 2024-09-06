using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMSBackend.Models
{
    [Table("suppliers")]
    public class Supplier
    {
        [Key]
        public int id { get; set; }

        [Required]
        [StringLength(100)]
        public string name { get; set; }

        [StringLength(100)]
        public string contact_person { get; set; }

        [StringLength(20)]
        public string phone { get; set; }

        [StringLength(100)]
        public string email { get; set; }

        [StringLength(50)]
        public string address { get; set; }

        [Required]
        public DateTime created_at { get; set; }

        // Navigation property for inventory items
        public ICollection<InventoryItem> supplied_items { get; set; }
    }
}

