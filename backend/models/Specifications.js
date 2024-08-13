import mongoose from 'mongoose';

const SpecificationSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  productId: { type: String, required: true },
});

const Specification = mongoose.model('Specification', SpecificationSchema);
export default Specification;
