import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
    },
    loginFail: (state, action) => {
      state.loading = false;
    },
    addFriends: (state, action) => {
      if (state.userInfo.following.includes(action.payload)) {
        state.userInfo.following.splice(
          state.userInfo.following.findIndex(
            (friend) => friend === action.payload
          ),
          1
        );
      } else {
        state.userInfo.following.push(action.payload);
      }
    },
    addWishList: (state, action) => {
      if (state.userInfo.wishList.includes(action.payload)) {
        state.userInfo.wishList.splice(
          state.userInfo.wishList.findIndex(
            (friend) => friend === action.payload
          ),
          1
        );
      } else {
        state.userInfo.wishList.push(action.payload);
      }
    },
    logOut: () => initialState,
  },
});

export const { addFriends, logOut, loginStart, loginSuccess, loginFail,  addWishList } =
  userSlice.actions;

export default userSlice.reducer;
