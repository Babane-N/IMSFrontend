using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMSBackend.Models
{
    public class InventoryUp
    {
        public int id { get; set; }
        public string part_name { get; set; }
        public string part_number { get; set; }
        public int quantity { get; set; }
        public decimal price { get; set; }
        public DateTime created_at { get; set; }
        public int supplier_id { get; set; }
        public int category_id { get; set; }
  
    }
}
