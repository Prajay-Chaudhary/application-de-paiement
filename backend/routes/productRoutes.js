const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM Products', (err, results) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).send('Error retrieving products from database');
    } else {
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('No products found');
      }
    }
  });
});

module.exports = router;