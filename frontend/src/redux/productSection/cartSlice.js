import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems:[]
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItems: (state, action) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find((item) => item._id === newItem._id);
      
      const updatedCartItems = existItem
        ? state.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cartItems, newItem];
    
      return { ...state, cartItems: updatedCartItems };
    },
    
    removeProduct: (state, action) => {
     state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
    },
    cartReset: () => initialState
    
  },
});

export const {cartReset, addCartItems, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
