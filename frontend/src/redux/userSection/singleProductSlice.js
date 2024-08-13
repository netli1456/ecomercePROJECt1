import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  singleProduct: {},
  singleProductUser: {},
  loading: false,
  error: null,
};

export const singleProductSlice = createSlice({
  name: 'userProduct',
  initialState,
  reducers: {
    singlefetchStart: (state) => {
      state.loading = true;
    },
    singlefetchSuccess: (state, action) => {
      state.singleProduct = action.payload;
      state.loading = false;
    },
    singlefetchFail: (state) => {
      state.loading = false;
    },
    singleUserSuccess: (state, action) => {
      state.singleProductUser = action.payload;
      state.loading = false;
    },
    addUserProductFriends: (state, action) => {
      if (state.singleProductUser.followers.includes(action.payload)) {
        state.singleProductUser.followers.splice(
          state.singleProductUser.followers.findIndex(
            (friend) => friend === action.payload
          ),
          1
        );
      } else {
        state.singleProductUser.followers.push(action.payload);
      }
    },
    userProductReset: () => initialState,

  },
});

// Action creators are generated for each case reducer function
export const {
  userProductReset,
  singleUserSuccess,
  singlefetchStart,
  singlefetchSuccess,
  singlefetchFail,
  addUserProductFriends,
} = singleProductSlice.actions;

export default singleProductSlice.reducer;
