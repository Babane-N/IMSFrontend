using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IMSBackend.Data;
using IMSBackend.Models;

namespace IMSBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockMovementsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StockMovementsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/StockMovements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockMovement>>> GetStockMovements()
        {
            return await _context.StockMovements.ToListAsync();
        }

        // GET: api/StockMovements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StockMovement>> GetStockMovement(int id)
        {
            var stockMovement = await _context.StockMovements.FindAsync(id);

            if (stockMovement == null)
            {
                return NotFound();
            }

            return stockMovement;
        }

        // PUT: api/StockMovements/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStockMovement(int id, StockMovement stockMovement)
        {
            if (id != stockMovement.id)
            {
                return BadRequest();
            }

            _context.Entry(stockMovement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StockMovementExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/StockMovements
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StockMovement>> PostStockMovement(StockMovement stockMovement)
        {
            _context.StockMovements.Add(stockMovement);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StockMovementExists(stockMovement.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetStockMovement", new { id = stockMovement.id }, stockMovement);
        }

        // DELETE: api/StockMovements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStockMovement(int id)
        {
            var stockMovement = await _context.StockMovements.FindAsync(id);
            if (stockMovement == null)
            {
                return NotFound();
            }

            _context.StockMovements.Remove(stockMovement);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StockMovementExists(int id)
        {
            return _context.StockMovements.Any(e => e.id == id);
        }
    }
}
