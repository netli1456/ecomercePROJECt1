import express from 'express';
import Products from '../models/Product.js';
import mongoose from 'mongoose';
import Users from '../models/User.js';
import Order from '../models/Order.js';
import ShippingAddress from '../models/Shipping.js';

const seedRouter = express.Router();

// MongoDB Atlas connection URI
const atlasUri =
  'mongodb+srv://ecommerceProject1:ecommerceProject1@cluster0.zv19hgj.mongodb.net/?retryWrites=true&w=majority';

const localUri = 'mongodb://127.0.0.1:27017/ecommerce-project1';

seedRouter.get('/', async (req, res) => {
  try {
    // Connect to your local MongoDB
    await mongoose.connect(localUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const localOrders = await Order.find();

    // Disconnect from your local MongoDB
    await mongoose.connection.close();

    // Connect to MongoDB Atlas
    await mongoose.connect(atlasUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const insertedOrders = await Order.insertMany(localOrders);

    // Disconnect from MongoDB Atlas
    await mongoose.connection.close();

    // Send a response with the inserted products
    res.status(200).json(insertedOrders);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Data migration failed.' });
  }
});
export default seedRouter;
