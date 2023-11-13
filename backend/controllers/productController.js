const db = require('../config/db');

/**
 * Controller function to retrieve all products from the database.
 * Responds with a JSON array of products or an error message.
 */
const getAllProducts = (req, res) => {
  // Execute a SQL query to select all products from the 'Products' table
  db.query('SELECT * FROM Products', (err, results) => {
    if (err) {
      // Log and handle database query errors
      console.error("Error executing query: ", err);
      res.status(500).send('Error retrieving products from the database');
    } else {
      // Check if products were found in the database
      if (results.length > 0) {
        // Respond with a JSON array of products
        res.json(results);
      } else {
        // Respond with a message when no products are found
        res.send('No products found');
      }
    }
  });
};

/**
 * Controller function to add items to the cart.
 * Responds with the updated cart or an error message.
 */
const addToCart = (req, res) => {
  // Ensure that req.session is available
  if (!req.session) {
    return res.status(500).json({ success: false, message: 'Session not available.' });
  }

  const { productId, quantity } = req.body;

  // Fetch product details from the database
  const getProductQuery = 'SELECT * FROM Products WHERE id = ?';

  db.query(getProductQuery, [productId], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ success: false, message: 'Product not found' });
      } else {
        const product = results[0];

        // Check stock and update cart
        if (product.inventory >= quantity) {
          // Add logic to update the cart and deduct stock from the database

          // Example: In-memory cart storage
          let cart = req.session.cart || {};
          cart[productId] = (cart[productId] || 0) + quantity;

          // Update product inventory in the database
          const updateInventoryQuery = 'UPDATE Products SET inventory = ? WHERE id = ?';
          db.query(updateInventoryQuery, [product.inventory - quantity, productId], (updateErr) => {
            if (updateErr) {
              console.error('Error updating product inventory:', updateErr);
              res.status(500).json({ success: false, message: 'Internal Server Error' });
            } else {
              // Update session cart
              req.session.cart = cart;

              res.json({ success: true, cart });
            }
          });
        } else {
          res.status(400).json({ success: false, message: 'Insufficient stock.' });
        }
      }
    }
  });
};

module.exports = { getAllProducts, addToCart };
