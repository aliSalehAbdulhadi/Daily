import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  sortTask: '',
};

const sortTask = createSlice({
  name: 'sortTask',
  initialState,
  reducers: {
    sortTaskBy: (
      state: { sortTask: string },
      action: PayloadAction<string>,
    ) => {
      state.sortTask = action.payload;
    },
  },
});

export const { sortTaskBy } = sortTask.actions;

export default sortTask.reducer;
