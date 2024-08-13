import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userProduct: [],
  loading: false,
  error: null,
};

export const userProductsSlice = createSlice({
  name: 'userProduct',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.userProduct = action.payload;
      state.loading = false;
    },
    fetchFail: (state) => {
      state.loading = false;
    },
    productReset:() => initialState
  },
});

// Action creators are generated for each case reducer function
export const {productReset, fetchStart, fetchSuccess, fetchFail } =
  userProductsSlice.actions;

export default userProductsSlice.reducer;
