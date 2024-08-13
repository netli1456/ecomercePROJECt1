import express from 'express';
import { addOrder, getOrderByid, getUserOrders, getUsersOrdersNow, updateSuccessPay } from '../controllers/orders.js';

const orderRouter = express.Router();

orderRouter.post('/:userId', addOrder);
orderRouter.get('/:id', getOrderByid);

orderRouter.put('/:id/pay', updateSuccessPay);
orderRouter.get('/:userId/all', getUserOrders);
orderRouter.get('/:userId/allordersnow', getUsersOrdersNow);

export default orderRouter;
