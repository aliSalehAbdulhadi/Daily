import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

const darkMode = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (
      state: { darkMode: boolean },
      action: PayloadAction<boolean>,
    ) => {
      state.darkMode = action.payload;
    },
  },
});

export const { toggleDarkMode } = darkMode.actions;

export default darkMode.reducer;
