import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../container/firebase';
import { SingleTaskInterface } from '../../../interfaces/interfaces';
import { initialState } from '../../../interfaces/interfaces';

export const reArrangeFirebase = createAsyncThunk(
  'reArrangeFirebase/bookmark',
  async ({
    userUid,
    allTasks,
  }: {
    userUid: string;
    allTasks: SingleTaskInterface[];
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      userData: { tasks: allTasks },
    });
  },
);

const initialState: initialState = {
  error: [],
  state: '',
};

const reArrange = createSlice({
  name: 'SignInSlice',
  initialState,
  reducers: {},
  extraReducers(build) {
    build.addCase(reArrangeFirebase.pending, (state) => {
      state.state = 'pending';
    }),
      build.addCase(reArrangeFirebase.fulfilled, (state) => {
        state.state = 'fulfilled';
      }),
      build.addCase(reArrangeFirebase.rejected, (state, action: any) => {
        state.error = action;
        state.state = 'rejected';
      });
  },
});

export default reArrange.reducer;
