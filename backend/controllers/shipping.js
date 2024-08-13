import ShippingAddress from '../models/Shipping.js';
import Users from '../models/User.js';

export const addShipping = async (req, res) => {
  const userId = req.params.userId;
  const user = await Users.findById(userId);
  try {
    const ship = await ShippingAddress.findOne({ userId: userId });
    if (ship) {
      res.status(200).json(ship);
    } else {
      try {
        const newShipping = new ShippingAddress(req.body);
        await newShipping.save();
        user.shipping = true;
        res.status(200).json(newShipping);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getShipping = async (req, res) => {
  try {
    const userId = req.params.userId;
    const shipping = await ShippingAddress.findOne({ userId: userId });
    res.status(200).json(shipping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateShipping = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedshipping = await ShippingAddress.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { $new: true }
    );
    await updatedshipping.save();
    res.status(200).json(updatedshipping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
