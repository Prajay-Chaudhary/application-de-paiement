const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser

const app = express();
const productRoutes = require('./routes/productRoutes');

// Use cors middleware to handle CORS headers
app.use(cors());

// Use body-parser middleware to parse JSON in the request body
app.use(bodyParser.json());

const session = require('express-session');
app.use(session({ secret: '1234567890abcdefghijklmnopqrstuvwxyz', resave: true, saveUninitialized: true }));


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
