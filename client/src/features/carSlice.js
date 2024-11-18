import { createSlice } from "@reduxjs/toolkit";

const loadFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    const parsedItem = item ? JSON.parse(item) : defaultValue;
    return Array.isArray(parsedItem) ? parsedItem : defaultValue; // Ensure it's an array
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const initialState = {
  list: loadFromStorage('carsList', []),
};

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action) => {
      state.list = Array.isArray(action.payload) ? action.payload : [];
      saveToStorage('carsList', state.list);
    },
    addCar: (state, action) => {
      console.log("action in add car",action)
      state.list.push(action.payload);
      saveToStorage('carsList', state.list);
    },
    updateCar: (state, action) => {
      console.log("action in update slice",action)
      console.log("state.list",state)
      const index = state.list.findIndex((car) => car._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
        saveToStorage('carsList', state.list);
      }
    },
    deleteCar: (state, action) => {
      state.list = state.list.filter((car) => car._id !== action.payload);
      saveToStorage('carsList', state.list);
    },
    clearCars: (state) => {
      state.list = [];
      localStorage.removeItem('carsList');
    },
  },
});

export const { setCars, addCar, updateCar, deleteCar, clearCars } = carSlice.actions;
export default carSlice.reducer;
