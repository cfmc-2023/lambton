const Cart = require('../models/cart');

// Create a new cart
exports.createCart = async (req, res) => {
  try {
    const { user, items, total } = req.body;

    const cart = new Cart({
      user,
      items,
      total
    });

    const savedCart = await cart.save();

    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the cart.' });
  }
};

// Get all carts
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();

    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the carts.' });
  }
};

// Get a single cart by ID
exports.getCartById = async (req, res) => {
  try {
    const cartId = req.params.id;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the cart.' });
  }
};

// Update a cart by ID
exports.updateCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const { user, items, total } = req.body;

    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      {
        $set: {
          user,
          items,
          total
        }
      },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the cart.' });
  }
};

// Delete a cart by ID
exports.deleteCart = async (req, res) => {
  try {
    const cartId = req.params.id;

    const deletedCart = await Cart.findByIdAndDelete(cartId);

    if (!deletedCart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }

    res.json({ message: 'Cart deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the cart.' });
  }
};
