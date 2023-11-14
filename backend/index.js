const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const productRoutes = require('./routes/productRoutes');
const orderController = require('./controllers/orderController');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Middleware for managing session
app.use(session({ secret: '1234567890abcdefghijklmnopqrstuvwxyz', resave: true, saveUninitialized: true }));

// POST and Get requests to create an order and get the products
app.post('/api/create-order', orderController.createOrder);
app.use('/products', productRoutes);

// Setting up the server to listen on port 4000
const port = 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
