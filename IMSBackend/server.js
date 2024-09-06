const express = require('express');
const mysql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 40443;

const dbConfig = {
    user: 'BABANE_N/XAHUMBA',
    password: 'Babane01',
    server: 'babane_n//SQLEXPRESS', // Update with your server name or IP
    database: 'car_parts_business_db',
    options: {
        encrypt: true, // Use this if you're on Azure or need encryption
        trustServerCertificate: true // Change this to true for local development
    }
};

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

app.use(cors());
app.use(bodyParser.json());

// Routes

// Fetch inventory items
app.get('/api/InventoryItems', (req, res) => {
    db.query('SELECT * FROM inventory', (err, results) => {
        if (err) {
            console.error('Error fetching inventory:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// Add a new inventory item
app.post('/api/InventoryItems', (req, res) => {
    const { part_name, part_number, quantity, price, supplier, supplier_id, category_id } = req.body;

    // Validation
    if (!part_name || !part_number || !quantity || !price || !supplier || !supplier_id || !category_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Insert into database
    db.query(
        'INSERT INTO inventory (part_name, part_number, quantity, price, supplier, supplier_id, category_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
        [part_name, part_number, quantity, price, supplier, supplier_id, category_id],
        (err, results) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ id: results.insertId });
        }
    );
});

// Update an existing inventory item
app.put('/api/InventoryItems/:id', (req, res) => {
    const id = req.params.id;
    const { part_name, part_number, quantity, price, supplier, supplier_id, category_id } = req.body;

    // Validation
    if (!part_name || !part_number || !quantity || !price || !supplier || !supplier_id || !category_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Update in database
    db.query(
        'UPDATE inventory SET part_name = ?, part_number = ?, quantity = ?, price = ?, supplier = ?, supplier_id = ?, category_id = ?, updated_at = NOW() WHERE id = ?',
        [part_name, part_number, quantity, price, supplier, supplier_id, category_id, id],
        (err, results) => {
            if (err) {
                console.error('Error updating data:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Inventory item not found' });
            }

            res.json({ message: 'Inventory item updated successfully' });
        }
    );
});

// Delete an inventory item by ID
app.delete('/api/InventoryItems/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM inventory WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }

        res.json({ message: 'Inventory item deleted successfully' });
    });
});

// Delete an inventory item by part number
app.delete('/api/InventoryItems/part/:partNumber', (req, res) => {
    const partNumber = req.params.partNumber;

    db.query('DELETE FROM inventory WHERE part_number = ?', [partNumber], (err, result) => {
        if (err) {
            console.error('Error deleting inventory by part number:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }

        res.json({ message: 'Inventory item removed successfully' });
    });
});

// Fetch all users
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});

// Delete a user by ID
app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
