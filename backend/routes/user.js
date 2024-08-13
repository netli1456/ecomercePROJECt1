import express from 'express';
import {
  addFollowers,
  deleteUser,
  getAllFriends,
  getAllUsers,
  getUser,
  searchUsers,
  signinUser,
  signupUser,
  updatePassword,
  updateUser,
} from '../controllers/users.js';
import { verifyToken } from '../verifyToken.js';

const userRouter = express.Router();

userRouter.post('/signup', signupUser);
userRouter.post('/signin', signinUser);
userRouter.put('/update/:id', updateUser);
userRouter.delete('/:id', verifyToken, deleteUser);
userRouter.put('/addfollows/:id/:friendId', addFollowers);
userRouter.get('/', getAllUsers);
userRouter.get('/follows/:id', getAllFriends);
userRouter.get('/', searchUsers);
userRouter.get('/:id', getUser);

export default userRouter;
