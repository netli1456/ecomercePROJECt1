import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    numReviews: { type: Number, default: 0 },
    succcessfulPaid:{ type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    imgUrl: { type: String },
    userId: { type: String, required: true },
    freeShipping: { type: Boolean, default: false },
    suspend: { type: Boolean, default: false},
    discount: { type: Number, default:0 },
    wishListUsers: { type: Array, default: [] },
    category: {
      type: String,
      enum: ['lowprice', 'highprice', 'lowdiscount', 'highdiscount', 'random'],
      required: true,
    },
    categoryList: [
      {
        name: { type: String, required: true },
        subCategories: [
          { name: { type: String, required: true } },
        ],
      },
    ],
    
    
    specifications: [{ title: String, description: String }],
    sizes: [{ size: Number }],
    length: [{ inches: Number }],
    colors: [{ name:String }],
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model('Products', ProductSchema);
export default Products;
