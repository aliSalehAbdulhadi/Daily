import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const addTaskSlice = createSlice({
  name: "addTask",
  initialState,
  reducers: {
    addTask: (state: any, action: PayloadAction<{}>): void => {
      state.tasks.push(action.payload);
    },
  },
});

export const { addTask } = addTaskSlice.actions;

export default addTaskSlice.reducer;
