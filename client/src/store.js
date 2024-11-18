import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSilce.js";
import carReducer from "./features/carSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carReducer,
  },
});

export default store;
