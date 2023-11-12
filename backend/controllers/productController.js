const db = require('../config/db');

/**
 * Controller function to retrieve all products from the database.
 * Responds with a JSON array of products or an error message.
 */
module.exports.getAllProducts = (req, res) => {
  // Execute a SQL query to select all products from the 'Products' table
  db.query('SELECT * FROM Products', (err, results) => {
    if (err) {
      // Log and handle database query errors
      console.error("Error executing query: ", err);
      res.status(500).send('Error retrieving products from database');
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

