// Importing required modules
const express = require('express');
const cors = require('cors');
const app = express();
const productRoutes = require('./routes/productRoutes');

// Using cors middleware to handle CORS headers
app.use(cors());

// Handling a simple GET request for the root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Using the productRoutes for the '/products' route
app.use('/products', productRoutes);

// Starting the server on port 4000
const port = 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
