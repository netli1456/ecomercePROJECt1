import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    isSeller: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    imgUrl: { type: String },
    phoneNumber: { type: Number },
    fax: { type: Number},
    zip: { type: Number},
    gender: { type: String},
    country: { type: String},
    password: { type: String, required: true },
    storeName: { type: String },
    storeImg: { type: String },
    storeCoverPhoto: { type: String },
    storeCreatedAt: { type: Date },
    following: { type: Array, default: [] },
    wishList: { type: Array, default: [] },
    followers: { type: Array, default: [] },
    shipping: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model('Users', UserSchema);
export default Users;
