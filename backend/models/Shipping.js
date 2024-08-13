import mongoose from 'mongoose';

const ShippingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    userId: { type: String, required: true },
    localGov: { type: String, required: true},
    streetAddress: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    zipCode: { type: Number, required: true },
    appartment: { type: String },
  },
  {
    timestamps: true,
  }
);

const ShippingAddress = mongoose.model('ShippingAddress', ShippingSchema);
export default ShippingAddress;
