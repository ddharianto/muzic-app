import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  email_verified: '',
  picture: '',
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    AUTH: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.email_verified = action.payload.email_verified;
      state.picture = action.payload.picture;
      state.isLogin = true;
    },
    LOGOUT: (state) => {
      state.name = '';
      state.email = '';
      state.email_verified = '';
      state.picture = '';
      state.isLogin = false;
    },
  },
});

export const { AUTH, LOGOUT } = authSlice.actions;

export default authSlice.reducer;
