import express from 'express';
import { addProduct, allProductCategory, allProducts,  categories,  deleteProduct, followedUsersPost, getProduct, getRandomsfrompost, getUserWishList, search,  searchingProducts,  updateProduct, userCategories, userProduct, wishList } from '../controllers/products.js';
import { verifyToken } from '../verifyToken.js';
import { calculateCategory } from '../CategoryMiddleWare.js';

const productRouter = express.Router();



productRouter.post('/', calculateCategory, addProduct);
productRouter.get('/random', getRandomsfrompost);
productRouter.get('/searchingproducts', searchingProducts);
productRouter.get('/:id/wishlistproducts', getUserWishList);
productRouter.get('/:id/categories', userCategories); 
productRouter.get('/categories', categories);
productRouter.get('/allproductCategory', allProductCategory);
productRouter.get('/allproducts', allProducts);
productRouter.get('/search', search);

productRouter.get('/:id', getProduct);


productRouter.put('/:id/:productId/wishlist', wishList); 
productRouter.get('/:id/following', followedUsersPost);
productRouter.get('/userproducts/:userId', userProduct);
productRouter.put('/:id/update', verifyToken, updateProduct);
productRouter.delete('/:id/delete', verifyToken, deleteProduct);




export default productRouter
