import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../container/firebase';
import {
  initialState,
  SingleTaskInterface,
} from '../../../interfaces/interfaces';

export const removeTask = createAsyncThunk(
  'removeTask',
  async ({
    userUid,
    taskId,
    allTasks,
  }: {
    userUid: string;
    taskId: string;
    allTasks: SingleTaskInterface[];
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      userData: {
        tasks: allTasks.filter((task: SingleTaskInterface) => {
          if (task.id === taskId) {
            return false;
          } else {
            return true;
          }
        }),
      },
    });
  },
);

const initialState: initialState = {
  error: [],
  state: '',
};

const removeTaskStatus = createSlice({
  name: 'removeTask',
  initialState,
  reducers: {
    uploadLocalDataResetStatus: (state: any) => {
      state.state = '';
    },
  },
  extraReducers(build) {
    build.addCase(removeTask.pending, (state) => {
      state.state = 'pending';
    }),
      build.addCase(removeTask.fulfilled, (state) => {
        state.state = 'fulfilled';
      }),
      build.addCase(removeTask.rejected, (state, action: any) => {
        state.error = action;
        state.state = 'rejected';
      });
  },
});

export default removeTaskStatus.reducer;
