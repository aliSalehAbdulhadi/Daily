import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isNotImportant: false,
};

const isNotImportant = createSlice({
  name: 'isNotImportant',
  initialState,
  reducers: {
    toggleIsNotImportant: (
      state: { isNotImportant: boolean },
      action: PayloadAction<boolean>,
    ) => {
      state.isNotImportant = action.payload;
    },
  },
});

export const { toggleIsNotImportant } = isNotImportant.actions;

export default isNotImportant.reducer;
