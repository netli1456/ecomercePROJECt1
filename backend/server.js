import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';
import updateRouter from './routes/updateProducts.js';
import shippingRouter from './routes/shipping.js';
import orderRouter from './routes/order.js';

import seedRouter from './routes/SeedRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'https://aloservices-ji34.onrender.com', 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200, 
  })
);
app.use(cookieParser());

app.get('/api/keys/paypal', (req, res) => {
  try {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/update', updateRouter);
app.use('/api/shipping', shippingRouter);
app.use('/api/orders', orderRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => console.log(err));



app.use('/api/seed', seedRouter);


app.listen(process.env.PORT, () => {
  console.log('server connected');
  
});
