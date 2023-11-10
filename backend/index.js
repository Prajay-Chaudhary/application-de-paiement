const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes'); // Ensure the path is correct

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Correctly use the product routes
app.use('/products', productRoutes);

const port = 4000; // Or any other preferred port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
