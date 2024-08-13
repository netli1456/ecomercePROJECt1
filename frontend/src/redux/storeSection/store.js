import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userInfoReducer from '../userSection/userSlice';
import userProductReducer from '../userSection/userProducts';
import cartReducer from '../productSection/cartSlice';
import singleProductReducer from '../userSection/singleProductSlice';
import shippinSliceReducer from '../shippingSection/shippinSlice';
import paymentReducer from '../paymentSection/paymentSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  user: userInfoReducer,
  cart: cartReducer,
  products: userProductReducer,
  single: singleProductReducer,
  shippingAddress: shippinSliceReducer,
  paymentM: paymentReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
