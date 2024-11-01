using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMSBackend.Models
{
    [Table("inventory")]
    public class InventoryItem
    {
        [Key]
        public int id { get; set; }

        [Required]
        [StringLength(100)]
        [Column(TypeName = "nvarchar(100)")] // Specifies SQL Server column type
        public string part_name { get; set; }

        [Required]
        [StringLength(50)]
        [Column(TypeName = "nvarchar(50)")]
        public string part_number { get; set; }

        [Required]
        public int quantity { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")] // Specifies decimal type with precision and scale
        public decimal price { get; set; }

        [ForeignKey(nameof(supplier_id))]
        public Supplier supplier { get; set; }

        [Required]
        [Column(TypeName = "datetime2")] // Specifies SQL Server column type for datetime
        public DateTime created_at { get; set; }

        [Required]
        public int supplier_id { get; set; }

        [Required]
        public int category_id { get; set; }

        [ForeignKey(nameof(category_id))]
        public ProductCategory category { get; set; }

    
    }
}
