const express = require('express');
const router = express.Router();

// Importing the productController for handling product-related routes
const productController = require('../controllers/productController');

// Defining a route to handle GET requests for fetching products
router.get('/', productController.getProducts);

module.exports = router;
