import Products from '../models/Product.js';
import Users from '../models/User.js';

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const addProduct = async (req, res) => {
  try {
    const product = new Products(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getRandomsfrompost = async (req, res) => {
  try {
    const lowpriceproduct = await Products.aggregate([
      { $match: { category: 'lowprice' } },
      {
        $sample: { size: 4 },
      },
    ]);
    const highpriceProduct = await Products.aggregate([
      { $match: { category: 'highprice' } },
      {
        $sample: { size: 3 },
      },
    ]);
    const lowdiscountproduct = await Products.aggregate([
      { $match: { category: 'lowdiscount' } },
      {
        $sample: { size: 4 },
      },
    ]);
    const highdiscountProduct = await Products.aggregate([
      { $match: { category: 'highdiscount' } },
      {
        $sample: { size: 3 },
      },
    ]);
    const randomProduct = await Products.aggregate([
      { $match: { category: 'random' } },
      {
        $sample: { size: 20 },
      },
    ]);

    const response = {
      lowprice: lowpriceproduct,
      highprice: highpriceProduct,
      lowdiscount: lowdiscountproduct,
      highdiscount: highdiscountProduct,
      randomProducts: randomProduct,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const allProducts = async (req, res) => {
  try {
    const products = await Products.aggregate([{ $sample: { size: 10000 } }]);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res, next) => {
  const product = await Products.findById(req.params.id);
  try {
    if (req.user.isAdmin || req.user._id === product.userId) {
      const updatedProduct = await Products.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      await updatedProduct.save();
      res.status(200).send(updatedProduct);
    } else {
      res.status(501).json('authorized action');
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const product = await Products.findById(req.params.id);
  try {
    if (req.user.isAdmin || req.user._id === product.userId) {
      await Products.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'product deleted' });
    }
  } catch (error) {
    next(error);
  }
};

export const userProduct = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await Users.findById(userId);
    const product = await Products.find({ userId: userId });
    res.status(200).json({ product, user });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const searchProduct = async (req, res) => {
  const query = req.params.query;
  if (typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query parameter' });
  }

  try {
    const products = await Products.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
        { desc: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const PAGE_SIZE = 12;
export const search = async (req, res) => {
  try {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const category = query.category || '';
    const page = query.page || 1;
    const brand = query.brand || '';
    const price = query.price || '';
    const order = query.order || '';
    const searchQuery = query.searchQuery || '';
    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const brandFilter = brand && brand !== 'all' ? { brand } : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Products.find({
      ...queryFilter,
      ...brandFilter,
      ...priceFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Products.countDocuments({
      ...queryFilter,
      ...brandFilter,
      ...priceFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  } catch (error) {
    console.log(error);
  }
};

export const allProductCategory = async (req, res) => {
  try {
    const highprice = await Products.aggregate([{ $sample: { size: 3 } }]).sort(
      { price: -1 }
    );
    const lowprice = await Products.aggregate([{ $sample: { size: 3 } }]).sort({
      price: 1,
    });
    const highdiscount = await Products.aggregate([
      { $sample: { size: 4 } },
    ]).sort({ discount: -1 });
    const lowdiscount = await Products.aggregate([
      { $sample: { size: 5 } },
    ]).sort({ discount: 1 });
    const mostPaidFor = await Products.aggregate([
      { $sample: { size: 5 } },
    ]).sort({ mostPaidFor: -1 });
    const randomProducts = await Products.aggregate([{ $sample: { size: 5 } }]);

    const response = {
      highprice: highprice,
      lowprice: lowprice,
      highdiscount: highdiscount,
      lowdiscount: lowdiscount,
      mostPaidFor: mostPaidFor,
      randomProducts: randomProducts,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const categories = async (req, res) => {
  try {
    const category = await Products.find().distinct('brand');
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userCategories = async (req, res) => {
  try {
    const userId = req.params.id;
    const userCategoriesItems = await Products.find({ userId }).distinct(
      'brand'
    );
    if (!userCategoriesItems)
      return res.status(404).json({ message: 'No user category found' });
    res.status(200).json(userCategoriesItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const followedUsersPost = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    const product = await Products.find();
    const userFollowing = user.following;
    if (userFollowing) {
      const listFollowing = await Promise.all(
        userFollowing.map(async (followingId) => {
          const products = await Products.find({ userId: followingId });
          const productUser = await Users.findById(followingId);
          return {
            product: products,
            user: productUser,
          };
        })
      );
      res.status(200).json(listFollowing);
    } else {
      res.status(404).json({ message: 'User following products not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const wishList = async (req, res) => {
  const { id, productId } = req.params;

  try {
    const product = await Products.findById(productId);
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json('no product found');
    }

    if (!user.wishList.includes(productId)) {
      product.wishListUsers.push(id);
      user.wishList.push(productId);
    } else {
      product.wishListUsers = product.wishListUsers.filter(
        (user) => user !== id
      );
      user.wishList = user.wishList.filter((user) => user !== productId);
    }
    const savedProduct = await product.save();
    await user.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserWishList = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json('no user found');
    }
    const wishList = user.wishList;
    const listWishList = await Promise.all(
      wishList.map((ids) => Products.find({ _id: ids }))
    );
    const flattenedWishList = listWishList.flat();

    res.status(200).json(flattenedWishList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchingProducts = async (req, res) => {
  try {
    const { query } = req.query;

    const products = await Products.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
        { desc: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
