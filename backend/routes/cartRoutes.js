const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Add items to the cart
router.post('/add-to-cart', productController.addToCart);

module.exports = router;
