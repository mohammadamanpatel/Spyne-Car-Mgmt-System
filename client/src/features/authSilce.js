import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("action", action);
      state.user = action.payload.user;
      state.token = action.payload.token;
      
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
      
      console.log("state.user", state.user);
      console.log("state.token", state.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

// Selector to check if user is authenticated
export const selectIsAuthenticated = (state) => !!state.auth.token;

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
