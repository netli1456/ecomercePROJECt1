import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderItems: [
    {
      name: { type: String, required: true },
      brand: { type: String, required: true },
      price: { type: Number, required: true },
      imgUrl: { type: String },
      discount: { type: Number },
      quantity: { type: Number, required: true },
      productId: { type: String, required: true },
      userId: { type: String, required: true},
    desc: { type: String, required: true },
   
 
    },
  ],

  shippingFee: { type: Number, required: true },
  shippingAddress: {
    name: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    localGov: { type: String, required: true },
    streetAddress: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    zipCode: { type: Number, required: true },
    appartment: { type: String },
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String,
  },
  subTotal: { type: Number, required: true },
  userId: { type: String, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  paymentMethod: { type: String, required: true },
  delivered: { type: Boolean, default: false },
  deliveredAt: {type: Date },
},{
  timestamps:true
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
