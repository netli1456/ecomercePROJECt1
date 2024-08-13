import express from 'express';
import Products from '../models/Product.js';

const updateRouter = express.Router();


updateRouter.post('/', async (req, res) => {
    try {
        const result = await Products.updateMany({}, { $set: { mostPaidFor: 0 } });
        res.json({
            message: `Matched ${result.n} documents and modified ${result.nModified} documents`,
          });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


export default updateRouter