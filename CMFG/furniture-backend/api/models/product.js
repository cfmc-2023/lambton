const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    // ref: 'Category',
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  dimensions: {
    type: String,
    required: false
  },
  color: {
    type: String,
    required: false
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  images: [String],
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
