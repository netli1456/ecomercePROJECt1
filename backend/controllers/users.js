import bcrypt from 'bcryptjs';
import Users from '../models/User.js';
import jwt from 'jsonwebtoken';
import Products from '../models/Product.js';
import { generateToken } from '../verifyToken.js';

export const signupUser = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password);
    const newUser = new Users({ ...req.body, password: hash });
    const user = await newUser.save();
    const { password, ...others } = user._doc;
    const token = jwt.sign(
      {
        _id: others._id,
        name: others.name,
        email: others.email,
        isSeller: others.isSeller,
        isAdmin: others.isAdmin,
      },
      process.env.JWT_SECRET
    );
    const signedInUser = {
      _id: others._id,
      name: others.name,
      email: others.email,
      isSeller: others.isSeller,
      isAdmin: others.isAdmin,

      address: others.address,
      storeName: others.storeName,
      storeCreatedAt: others.storeCreatedAt,
      followers: others.followers,
      following: others.following,
      shipping: others.shipping,
      wishList: others.wishList,
      token: token,
    };
    res.status(200).json(signedInUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signinUser = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: 'User not found ' });

    if (req.body.password) {
      const password = await bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!password) return res.status(500).json('wrong credentials');
    }

    const { password, ...others } = user._doc;

    const signedInUser = {
      _id: others._id,
      name: others.name,
      email: others.email,
      isSeller: others.isSeller,
      isAdmin: others.isAdmin,
      wishList: others.wishList,
      address: others.address,
      storeName: others.storeName,
      storeCreatedAt: others.storeCreatedAt,
      followers: others.followers,
      following: others.following,
      shipping: others.shipping,
      token: generateToken(others),
    };

    res.status(200).json(signedInUser);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

export const addFollowers = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await Users.findById(id);
    const friend = await Users.findById(friendId);
    if (!user.following.includes(friendId)) {
      user.following.push(friendId);
      friend.followers.push(id);
    } else {
      user.following = user.following.filter(
        (follower) => follower !== friendId
      );
      friend.followers = friend.followers.filter((follow) => follow !== id);
    }

    await user.save();
    await friend.save();

    const listFollowers = await Promise.all(
      user.followers.map((follower) => Users.find(follower._id))
    );
    const listFollowing = await Promise.all(
      user.following.map((following) => Users.find(following._id))
    );

    const formattedFollows = {
      followers: listFollowers,
      following: listFollowing,
    };
    res.status(200).send({ formattedFollows, user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const updatedUser = await Users.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { password, ...others } = updatedUser._doc;
      await updatedUser.save();
      res.status(200).json(others);
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  } else {
    res.status(403).json('ids not match');
  }
};

export const deleteUser = async (req, res, next) => {
  const userId = req.user._id;
  const paramsId = req.params._id;

  const user = await Users.findById(userId);
  if (userId === paramsId || user.isAdmin) {
    try {
      await Users.findByIdAndDelete(userId);
      await Products.deleteMany(userId);
      res.status(200).json({ message: 'user and information deleted' });
    } catch (error) {
      next(error);
    }
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getAllFriends = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    const userFollowers = await Promise.all(
      user.followers.map((followerId) => Users.findById(followerId))
    );
    const userFollowing = await Promise.all(
      user.following.map((followId) => Users.findById(followId))
    );
    const usersFollows = {
      userFollowers: userFollowers,
      userFollowing: userFollowing,
    };
    res.status(200).json(usersFollows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchUsers = async (req, res) => {
  const query = req.query;
  try {
    const user = await Users.find({
      $or: [{ name: { regex: query, $Option: 'i' } }],
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.password) {
      const newPassword = req.body.password;
      const hashedPassword = bcrypt.hashSync(newPassword, 10);

      user.password = hashedPassword;

      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
