import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shipping: {},
  loading: false,
  error: null,
};

export const shippinSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    shippingStart: (state) => {
      state.loading = true;
    },
    shippingSuccess: (state, action) => {
      state.shipping = action.payload;
      state.loading = false;
    },
    shippingFail: (state) => {
      state.loading = false;
    },
    shippingReset: () => initialState
  },
  updateShipping: (state, action) => {
    
  }
});

// Action creators are generated for each case reducer function
export const {shippingReset, shippingStart, shippingSuccess, shippingFail } =
  shippinSlice.actions;
export default shippinSlice.reducer;
