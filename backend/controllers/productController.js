const pool = require('../config/db');

// Controller function for handling product retrieval
exports.getProducts = (req, res) => {
  pool.query('SELECT * FROM Products', (error, results) => {
    if (error) {
      console.error('Error fetching products:', error);
      return res.status(500).send('Error fetching products');
    }
    res.json(results);
  });
};
module.exports = exports;
