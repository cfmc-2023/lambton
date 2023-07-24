const mongoose = require("mongoose");
const Product = require("../models/product");
const stripe = require('stripe')('sk_test_51NUWQ1SI566mZ0EEnVJbkTbMZW0jvSWnzicOiuc66iO4d2b40U8tN2fen170XTOT2prH02TYAtyJDFpgVXfTQrGF00lI9e28zq');


// ************ create *************************
exports.createProduct = async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        category,
        brand,
        quantity,
        images,
        color,
        dimensions
      } = req.body;
  
      console.log("create product --------", req.body)
      const product = new Product({
        name,
        description,
        price,
        category,
        brand,
        quantity,
        images,
        color,
        dimensions
      });
  
      const savedProduct = await product.save();
  
      res.status(201).json(savedProduct);
    } catch (error) {
        console.log("Error ::::::::::", error)
        res.status(500).json({ error: 'An error occurred while creating the product.' });
    }
  };
  
//   **************** update **********************
exports.updateProduct = async (req, res) => {
    try {
      const productId = req.params.id; // Assuming the product ID is passed as a URL parameter
  
      const {
        name,
        description,
        price,
        category,
        brand,
        quantity,
        images,
        color,
        dimensions
      } = req.body;
  
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $set: {
            name,
            description,
            price,
            category,
            brand,
            quantity,
            images,
            color,
            dimensions
          }
        },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found.' });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the product.' });
    }
  };

//   ************** delete ***********************
exports.deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id; // Assuming the product ID is passed as a URL parameter
  
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found.' });
      }
  
      res.json({ message: 'Product deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the product.' });
    }
  };
  
//   get 
exports.getAggregatedData = async (req, res) => {
    try {
      const aggregatedData = await Product.find({
        
      });
      console.log("aggregatedData -------------", aggregatedData)
  
      res.json(aggregatedData);
    } catch (error) {
      console.log("error ------------", error)
      res.status(500).json({ error: 'An error occurred while retrieving aggregated data.' });
    }
  };

//   by id
exports.getProductById = async (req, res) => {
    try {
      const productId = req.params.id; // Assuming the product ID is passed as a URL parameter
  
      console.log("pid*****************", productId)

      // _id: new mongoose.Types.ObjectId(productId)
      const product = await Product.findById(productId);
      // .populate('category');
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
      }
  
      res.json(product);
    } catch (error) {
      console.log("Error *************", error)
      res.status(500).json({ error: 'An error occurred while retrieving the product.' });
    }
  };

exports.checkout = async (req, res) => {

  console.log("user order *************", req.body)
 try {
    const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: req?.body?.product?.name || "ABC",
          },
          unit_amount: Number(req?.body?.product)*100 || 100, // Amount in cents
        },
        quantity: req?.body?.quantity || 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/order-completed',
    cancel_url: 'http://localhost:3000/order-cancel',
  });
  return res.json({ id: session.id });
} catch(err) {
  res.json({ id: session.id, message: err });
}

};

