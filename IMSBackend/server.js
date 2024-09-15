const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 40080;

const dbConfig = {
    user: 'sa',
    password: 'HoneyPot60!',
    server: 'babane_n//SQLEXPRESS',
    database: 'car_parts_business_db',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

sql.connect(dbConfig, err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to database');
});

app.use(cors());
app.use(bodyParser.json());

// Fetch inventory items
app.get('/api/InventoryItems', (req, res) => {
    sql.request().query('SELECT * FROM inventory', (err, result) => {
        if (err) {
            console.error('Error fetching inventory:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(result.recordset);
    });
});

// Add a new inventory item
app.post('/api/InventoryItems', (req, res) => {
    const { part_name, part_number, quantity, price, supplier, supplier_id, category_id } = req.body;

    if (!part_name || !part_number || !quantity || !price || !supplier || !supplier_id || !category_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
        INSERT INTO inventory (part_name, part_number, quantity, price, supplier, supplier_id, category_id, created_at, updated_at) 
        VALUES (@part_name, @part_number, @quantity, @price, @supplier, @supplier_id, @category_id, GETDATE(), GETDATE())
    `;
    const request = new sql.Request();
    request.input('part_name', sql.VarChar, part_name);
    request.input('part_number', sql.VarChar, part_number);
    request.input('quantity', sql.Int, quantity);
    request.input('price', sql.Decimal, price);
    request.input('supplier', sql.VarChar, supplier);
    request.input('supplier_id', sql.Int, supplier_id);
    request.input('category_id', sql.Int, category_id);

    request.query(query, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ id: result.recordset.insertId });
    });
});

// Update an existing inventory item
app.put('/api/InventoryItems/:id', (req, res) => {
    const id = req.params.id;
    const { part_name, part_number, quantity, price, supplier, supplier_id, category_id } = req.body;

    if (!part_name || !part_number || !quantity || !price || !supplier || !supplier_id || !category_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
        UPDATE inventory 
        SET part_name = @part_name, part_number = @part_number, quantity = @quantity, price = @price, 
            supplier = @supplier, supplier_id = @supplier_id, category_id = @category_id, updated_at = GETDATE() 
        WHERE id = @id
    `;
    const request = new sql.Request();
    request.input('id', sql.Int, id);
    request.input('part_name', sql.VarChar, part_name);
    request.input('part_number', sql.VarChar, part_number);
    request.input('quantity', sql.Int, quantity);
    request.input('price', sql.Decimal, price);
    request.input('supplier', sql.VarChar, supplier);
    request.input('supplier_id', sql.Int, supplier_id);
    request.input('category_id', sql.Int, category_id);

    request.query(query, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }

        res.json({ message: 'Inventory item updated successfully' });
    });
});

// Delete an inventory item by ID
app.delete('/api/InventoryItems/:id', (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM inventory WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.Int, id);

    request.query(query, (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }

        res.json({ message: 'Inventory item deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
