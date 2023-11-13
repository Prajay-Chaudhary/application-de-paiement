const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const cartRoutes = require('./cartRoutes'); // Import the new cartRoutes

// Retrieve all products
router.get('/', productController.getAllProducts);

// Use the cartRoutes for the '/cart' route
router.use('/cart', cartRoutes);

module.exports = router;

