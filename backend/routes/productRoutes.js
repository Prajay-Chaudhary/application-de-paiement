const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * Define a route to handle GET requests for retrieving all products.
 * Delegates the handling to the getAllProducts function in the productController.
 */
router.get('/', productController.getAllProducts);

module.exports = router;
