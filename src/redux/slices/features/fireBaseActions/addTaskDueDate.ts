import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../container/firebase';
import {
  initialState,
  SingleTaskInterface,
} from '../../../../interfaces/interfaces';

export const addTaskDueDate = createAsyncThunk(
  'addTaskDueDate',
  async ({
    userUid,
    taskId,
    allTasks,
    dueDate,
  }: {
    userUid: string;
    taskId: string;
    allTasks: SingleTaskInterface[];
    dueDate: string;
  }) => {
    const docRef = doc(db, 'userData', userUid);
    console.log(userUid);
    console.log(taskId);
    console.log(allTasks);
    console.log(dueDate);

    await updateDoc(docRef, {
      userData: {
        tasks: allTasks?.map((task: SingleTaskInterface) => {
          task?.id === taskId ? { ...task, dueDate: dueDate } : task;
        }),
      },
    });
  },
);

const initialState: initialState = {
  error: [],
  state: '',
};

const addTaskDueDateStatus = createSlice({
  name: 'addTaskDueDate',
  initialState,
  reducers: {},
  extraReducers(build) {
    build.addCase(addTaskDueDate.pending, (state) => {
      state.state = 'pending';
    }),
      build.addCase(addTaskDueDate.fulfilled, (state) => {
        state.state = 'fulfilled';
      }),
      build.addCase(addTaskDueDate.rejected, (state, action: any) => {
        state.error = action;
        state.state = 'rejected';
      });
  },
});

export default addTaskDueDateStatus.reducer;
