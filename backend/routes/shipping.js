import express from 'express';
import { addShipping, getShipping, updateShipping } from '../controllers/shipping.js';

const shippingRouter = express.Router();

shippingRouter.post('/:userId', addShipping)
shippingRouter.get('/:userId', getShipping)
shippingRouter.put('/:id', updateShipping)

export default shippingRouter