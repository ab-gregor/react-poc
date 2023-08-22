const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');


const app = express();
const cors = require('cors');
const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
const data = JSON.parse(fs.readFileSync('../src/views/data.json', 'utf-8'));

app.use(bodyParser.json());
app.use(cors());

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ name: user.username, role: user.role });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Register
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = { username, password, role: 'user' };
    users.push(newUser);

    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    res.json({ name: newUser.username, role: newUser.role });
});



// Add a new product
app.post('/products', (req, res) => {
    const newProduct = req.body;
    data.products.push(newProduct);
    fs.writeFileSync('../src/views/data.json', JSON.stringify(data, null, 2));
    res.status(201).json(newProduct);
});

// Edit a product by ID
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = data.products.findIndex(p => p.id === productId);
    
    if(productIndex > -1) {
        Object.assign(data.products[productIndex], req.body);
        fs.writeFileSync('../src/views/data.json', JSON.stringify(data, null, 2));
        res.json(data.products[productIndex]);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// Delete a product by ID
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = data.products.findIndex(p => p.id === productId);
    
    if(productIndex > -1) {
        const deletedProduct = data.products.splice(productIndex, 1);
        fs.writeFileSync('../src/views/data.json', JSON.stringify(data, null, 2));
        res.json(deletedProduct);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
