import Order from '../models/Order.js';
import Products from '../models/Product.js';
import Users from '../models/User.js';

export const addOrder = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((item) => ({
        ...item,
        productId: item._id,
      })),
      shippingAddress: req.body.shippingAddress,
      subTotal: req.body.subTotal,
      userId: userId,
      shippingFee: req.body.shippingFee,
      paymentMethod: req.body.paymentMethod,
    });
    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getOrderByid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      return 'order not found';
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

// export const updateSuccessPay = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.email_address,
//       };

//       const orderId = order.orderItems.map((itemId) => itemId._id);
//       const eachProduct = await Products.updateMany(
//         { _id: { $in: orderId } },
//         {
//           $inc: { countInStock: -order.quantity, succcessfulPaid: 1 },
//         }
//       );

//       await eachProduct.save();
//       await order.save();
//       res.status(200).json(order);
//     } else {
//       res.status(404).json('order_not_found');
//     }
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });
    if (orders) {
      res.status(200).json(orders);
    } else {
      return 'order_not_found';
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const updateSuccessPay = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      await Promise.all(
        order.orderItems.map(async (orderItem) => {
          const product = await Products.findById(orderItem.productId);
          if (product) {
            product.succcessfulPaid += 1;
            product.countInStock -= orderItem.quantity;
            await product.save();
          }
        })
      );

      await order.save();
      res.status(200).json(order);
    } else {
      res.status(404).json('order_not_found');
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// export const getUsersOrdersNow = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const orders = await Order.find({ userId: userId }).sort({ createdAt: -1 });

//     if (!orders) {
//       return res.status(404).json({ error: 'Orders not found' });
//     }

//     const orderUserIds = orders.map(order => order.userId);
//     const users = await Users.find({ _id: { $in: orderUserIds } });

//     // Create a map of user IDs to user objects for efficient lookup
//     const usersMap = new Map(users.map(user => [user._id.toString(), user]));

//     // Combine orders and users
//     const ordersWithUsers = orders.map(order => ({
//       ...order.toObject(), // Convert Mongoose object to plain JavaScript object
//       user: usersMap.get(order.userId.toString()), // Add user details
//     }));

//     res.status(200).json(ordersWithUsers);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getUsersOrdersNow = async (req, res) => {
  const userId= req.params.userId;

  try {
    const orders = await Order.find({ userId: userId });

    if (orders.length === 0) {
      return res.status(404).json({ error: 'No orders found' });
    }

    const orderUserIds = orders.map(order => order.userId);

    const users = await Users.find({ _id: { $in: orderUserIds } });

    const orderAndUsers = orders.map(order => {
      const orderItems = order;
      const user = users.find(user => user._id.equals(orderItems.userId));

      return {
        ...orderItems.toObject(), 
        user: user,
      };
    });

    res.status(200).json(orderAndUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
