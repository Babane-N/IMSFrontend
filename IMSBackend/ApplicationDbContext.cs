// Data/ApplicationDbContext.cs
using IMSBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace IMSBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<InventoryItem> InventoryItems { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Log> Logs { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<StockMovement> StockMovements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InventoryItem>()
                .HasOne(i => i.supplier)
                .WithMany(s => s.supplied_items)
                .HasForeignKey(i => i.id);

            modelBuilder.Entity<InventoryItem>()
                .HasOne(i => i.category)
                .WithMany(c => c.InventoryItems)
                .HasForeignKey(i => i.id);

            modelBuilder.Entity<Log>()
                .HasOne(l => l.user)
                .WithMany() // Assuming User doesn't have a navigation property for logs
                .HasForeignKey(l => l.id);

            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Order)
                .WithMany(o => o.OrderDetails)
                .HasForeignKey(od => od.id);

            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.InventoryItem)
                .WithMany() // Assuming InventoryItem doesn't have a navigation property for order details
                .HasForeignKey(od => od.id);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.customer)
                .WithMany(c => c.Orders)
                .HasForeignKey(o => o.id);

            modelBuilder.Entity<StockMovement>()
                .HasOne(sm => sm.InventoryItem)
                .WithMany() // Assuming InventoryItem doesn't have a navigation property for stock movements
                .HasForeignKey(sm => sm.id);

            base.OnModelCreating(modelBuilder);
        }
    }
}
