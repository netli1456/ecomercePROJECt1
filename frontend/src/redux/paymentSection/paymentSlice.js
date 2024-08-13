import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  payment: '',
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    paymentSuccess: (state, action) => {
      state.payment = action.payload;
    },
    paymentReset: () => initialState,
  },
});

export const { paymentSuccess, paymentReset } = paymentSlice.actions;
export default paymentSlice.reducer;
