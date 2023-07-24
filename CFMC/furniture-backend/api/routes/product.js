const express = require("express");
const router = express.Router();
// const checkAuth = require('../middleware/check-auth');

const productController = require('../controllers/productController');

// Handle incoming GET requests to /orders
router.post("/add",  productController.createProduct);
// update
router.put('/update/:id', productController.updateProduct);
// Route to delete a product
router.delete('/delete/:id', productController.deleteProduct);
// Route to get aggregated data
router.post('/get/list', productController.getAggregatedData);
// Route to get a single product by ID
router.get('/get/:id', productController.getProductById);

router.post('/create-checkout-session', productController.checkout);

module.exports = router;
