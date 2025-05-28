const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(cors()); 
const PORT = 8080;

app.use(bodyParser.json());

//add a new part 
app.post('/parts', (req, res) => {
    const { Name, PartType, Brand, Quantity, Price, status } = req.body;
    const sql = 'INSERT INTO parts (Name, PartType, Brand, Quantity, Price, status) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [Name, PartType, Brand, Quantity, Price, status], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'Part Added Successfully', partId: result.insertId });
    });
});

// Get all parts
app.get('/parts', (req, res) => {
    db.query('SELECT * FROM parts', (err, results) => {
      if (err) {
        console.error('Error fetching parts:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results);
    });
});

// Get part by ID
app.get('/parts/:id', (req, res) => {
    const partId = req.params.id;
    // Try with uppercase ID field
    db.query('SELECT * FROM parts WHERE ID = ?', [partId], (err, results) => {
      if (err) {
        console.error('Error fetching part:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Part not found' });
      }
      res.json(results[0]);
    });
});

// Update an existing part
app.put('/parts/:id', (req, res) => {
    const partId = req.params.id;
    const { Name, PartType, Brand, Quantity, Price, status } = req.body;
    const sql = 'UPDATE parts SET Name=?, PartType=?, Brand=?, Quantity=?, Price=?, status=? WHERE ID=?';
    
    db.query(sql, [Name, PartType, Brand, Quantity, Price, status, partId], (err, result) => {
      if (err) {
        console.error('Error updating part:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Part not found' });
      }
      res.json({ message: 'Part updated successfully' });
    });
});

// Delete a part
app.delete('/parts/:id', (req, res) => {
    const partId = req.params.id;
    
    db.query('DELETE FROM parts WHERE ID = ?', [partId], (err, result) => {
      if (err) {
        console.error('Error deleting part:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Part not found' });
      }
      res.json({ message: 'Part deleted successfully' });
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });