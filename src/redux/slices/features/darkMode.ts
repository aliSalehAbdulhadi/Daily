import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

const darkMode = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state: any, action: any) => {
      state.darkMode = action.payload;
    },
  },
});

export const { toggleDarkMode } = darkMode.actions;

export default darkMode.reducer;
