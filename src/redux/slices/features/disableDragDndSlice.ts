import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  disableDragDnd: false,
};

const disableDragDnd = createSlice({
  name: 'disableDragDnd',
  initialState,
  reducers: {
    toggleDisableDragDnd: (
      state: { disableDragDnd: boolean },
      action: PayloadAction<boolean>,
    ) => {
      state.disableDragDnd = action.payload;
    },
  },
});

export const { toggleDisableDragDnd } = disableDragDnd.actions;

export default disableDragDnd.reducer;
