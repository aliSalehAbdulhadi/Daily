import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const notImportantTasks = createSlice({
  name: 'notImportantTasks',
  initialState,
  reducers: {
    addNotImportantTask: (
      state: { tasks: string[] },
      action: PayloadAction<string>,
    ) => {
      state.tasks.push(action?.payload);
    },
    removeNotImportantTask: (
      state: { tasks: string[] },
      action: PayloadAction<string>,
    ) => {
      state.tasks = state.tasks?.filter((task) => task !== action?.payload);
    },
  },
});

export const { addNotImportantTask, removeNotImportantTask } =
  notImportantTasks.actions;

export default notImportantTasks.reducer;
