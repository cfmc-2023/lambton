const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to create a new cart
router.post('/carts', cartController.createCart);

// Route to get all carts
router.get('/carts', cartController.getAllCarts);

// Route to get a single cart by ID
router.get('/carts/:id', cartController.getCartById);

// Route to update a cart by ID
router.put('/carts/:id', cartController.updateCart);

// Route to delete a cart by ID
router.delete('/carts/:id', cartController.deleteCart);

module.exports = router;
