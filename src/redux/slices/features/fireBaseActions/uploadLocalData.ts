import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateDoc, doc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '../../../../container/firebase';
import { SingleTaskInterface } from '../../../../interfaces/interfaces';
import { initialState } from '../../../../interfaces/interfaces';

export const uploadLocalData = createAsyncThunk(
  'uploadLocalData',
  async ({
    userUid,
    allTasks,
    allTasksCount,
    userName,
    tasksDates,
  }: {
    userUid: string;
    allTasks: SingleTaskInterface[];
    allTasksCount: number;
    userName: string;
    tasksDates: { date: string; id: string }[];
  }) => {
    try {
      const docRef = doc(db, 'userData', userUid);
      await updateDoc(docRef, {
        allTasksCount: allTasksCount,
        tasksDates: tasksDates,
        userData: { tasks: allTasks },
        userName: userName,
      });
    } catch (error) {
      return error;
    }
  },
);

const initialState: initialState = {
  error: [],
  state: '',
};

const reArrange = createSlice({
  name: 'uploadLocalData',
  initialState,
  reducers: {
    uploadLocalDataResetStatus: (state: any) => {
      state.state = '';
    },
  },
  extraReducers(build) {
    build.addCase(uploadLocalData.pending, (state) => {
      state.state = 'pending';
    }),
      build.addCase(uploadLocalData.fulfilled, (state) => {
        state.state = 'fulfilled';
      }),
      build.addCase(uploadLocalData.rejected, (state, action: any) => {
        state.error = action;
        state.state = 'rejected';
      });
  },
});

export default reArrange.reducer;
export const { uploadLocalDataResetStatus } = reArrange.actions;
