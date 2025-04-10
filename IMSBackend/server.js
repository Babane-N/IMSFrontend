const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 40080;

const dbConfig = {
    user: 'sa',
    password: 'HoneyPot60!',
    server: 'babane_n\\SQLEXPRESS',
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
    const request = new sql.Request();
    request.query('SELECT * FROM inventory', (err, result) => {
        if (err) {
            console.error('Error fetching inventory:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(result.recordset);
    });
});

// Add a new inventory item
app.post('/api/InventoryItems', (req, res) => {
    const { part_name, part_number, quantity, price, supplier_id, supplier, category_id } = req.body;

    if (!part_name || !part_number || !quantity || !price || !supplier_id || !supplier || !category_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
        INSERT INTO inventory (part_name, part_number, quantity, price, supplier_id, supplier, category_id, created_at, updated_at)
        VALUES (@part_name, @part_number, @quantity, @price, @supplier_id, @supplier, @category_id, GETDATE(), GETDATE())
    `;
    const request = new sql.Request();
    request.input('part_name', sql.VarChar, part_name);
    request.input('part_number', sql.VarChar, part_number);
    request.input('quantity', sql.Int, quantity);
    request.input('price', sql.Decimal, price);
    request.input('supplier_id', sql.Int, supplier_id);
    request.input('supplier', sql.VarChar, supplier);
    request.input('category_id', sql.Int, category_id);

    request.query(query, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Inventory item added successfully' });
    });
});

// Update an existing inventory item
app.put('/api/InventoryItems/:id', (req, res) => {
    const id = req.params.id;
    const { part_name, part_number, quantity, price, supplier_id, supplier, category_id } = req.body;

    if (!part_name || !part_number || !quantity || !price || !supplier_id || !supplier || !category_id) {
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
    request.input('supplier_id', sql.Int, supplier_id);
    request.input('supplier', sql.VarChar, supplier);
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

// Delete an inventory item by Part Number
app.delete('/api/InventoryItems/part-number/:partNumber', (req, res) => {
    const partNumber = req.params.partNumber;

    console.log(`Attempting to delete part with part_number: ${partNumber}`);

    const query = 'DELETE FROM inventory WHERE part_number = @partNumber';
    const request = new sql.Request();
    request.input('partNumber', sql.VarChar, partNumber);

    request.query(query, (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).json({
                error: 'Internal Server Error',
                details: err.message
            });
        }

        if (result.rowsAffected[0] === 0) {
            console.warn(`Part with part_number ${partNumber} not found.`);
            return res.status(404).json({
                error: 'Inventory item not found'
            });
        }

        console.log(`Part with part_number ${partNumber} deleted successfully.`);
        res.json({
            message: 'Inventory item deleted successfully'
        });
    });
});// Added missing closing brace

// Update an existing user
app.put('/api/Users/:id', async (req, res) => {
    const id = req.params.id;
    const { username, role } = req.body;

    // Validate input
    if (!username || !role) {
        return res.status(400).json({ error: 'Username and role are required' });
    }

    // SQL query to update user information
    const query = `
        UPDATE users 
        SET username = @username, role = @role 
        WHERE id = @id
    `;

    try {
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        request.input('username', sql.VarChar, username);
        request.input('role', sql.VarChar, role);

        const result = await request.query(query);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

app.get('/api/inventory/count', async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query('SELECT COUNT(*) AS count FROM inventory');
        res.json({ count: result.recordset[0].count });
    } catch (error) {
        console.error('Error fetching inventory count:', error);
        res.status(500).json({ message: 'Error fetching inventory count' });
    }
});
Closing SQL Connection:

You might want to handle the closing of the SQL connection gracefully when your application terminates.You can do this by listening to the process events:
javascript
Copy code
process.on('SIGINT', async () => {
    await sql.close();
    console.log('SQL connection closed.');
    process.exit(0);
});
Final Code Structure
Here�s a refined structure based on the suggestions:

javascript
Copy code
require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 40080;

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
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
app.get('/api/InventoryItems', async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query('SELECT * FROM inventory');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching inventory:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a new inventory item
app.post('/api/InventoryItems', async (req, res) => {
    const { part_name, part_number, quantity, price, supplier_id, supplier, category_id } = req.body;

    if (!part_name || !part_number || !quantity || !price || !supplier_id || !supplier || !category_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
        INSERT INTO inventory (part_name, part_number, quantity, price, supplier_id, supplier, category_id, created_at, updated_at)
        VALUES (@part_name, @part_number, @quantity, @price, @supplier_id, @supplier, @category_id, GETDATE(), GETDATE())
    `;
    const request = new sql.Request();
    request.input('part_name', sql.VarChar, part_name);
    request.input('part_number', sql.VarChar, part_number);
    request.input('quantity', sql.Int, quantity);
    request.input('price', sql.Decimal, price);
    request.input('supplier_id', sql.Int, supplier_id);
    request.input('supplier', sql.VarChar, supplier);
    request.input('category_id', sql.Int, category_id);

    try {
        await request.query(query);
        res.status(201).json({ message: 'Inventory item added successfully' });
    } catch (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an existing inventory item
app.put('/api/InventoryItems/:id', async (req, res) => {
    const id = req.params.id;
    const { part_name, part_number, quantity, price, supplier_id, supplier, category_id } = req.body;

    if (!part_name || !part_number || !quantity || !price || !supplier_id || !supplier || !category_id) {
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
    request.input('supplier_id', sql.Int, supplier_id);
    request.input('supplier', sql.VarChar, supplier);
    request.input('category_id', sql.Int, category_id);

    try {
        const result = await request.query(query);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json({ message: 'Inventory item updated successfully' });
    } catch (err) {
        console.error('Error updating data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete an inventory item by ID
app.delete('/api/InventoryItems/:id', async (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM inventory WHERE id = @id';
    const request = new sql.Request();
    request.input('id', sql.Int, id);

    try {
        const result = await request.query(query);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json({ message: 'Inventory item deleted successfully' });
    } catch (err) {
        console.error('Error deleting data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete an inventory item by Part Number
app.delete('/api/InventoryItems/part-number/:partNumber', async (req, res) => {
    const partNumber = req.params.partNumber;

    const query = 'DELETE FROM inventory WHERE part_number = @partNumber';
    const request = new sql.Request();
    request.input('partNumber', sql.VarChar, partNumber);

    try {
        const result = await request.query(query);
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json({ message: 'Inventory item deleted successfully' });
    } catch (err) {
        console.error('Error deleting data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an existing user
app.put('/api/Users/:id', async (req, res) => {
    const id = req.params.id;
    const { username, role } = req.body











app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
