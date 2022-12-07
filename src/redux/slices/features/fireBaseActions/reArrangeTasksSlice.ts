import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../../container/firebase';
import { SingleTaskInterface } from '../../../../interfaces/interfaces';
import { initialState } from '../../../../interfaces/interfaces';

export const reArrangeFirebase = createAsyncThunk(
  'reArrangeFirebase',
  async ({
    userUid,
    allTasks,
  }: {
    userUid: string;
    allTasks: SingleTaskInterface[];
  }) => {
    try {
      const docRef = doc(db, 'userData', userUid);
      await updateDoc(docRef, {
        userData: { tasks: allTasks },
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
  name: 'reArrangeFirebase',
  initialState,
  reducers: {},
  extraReducers(build) {
    build.addCase(reArrangeFirebase.pending, (state) => {
      state.state = 'pending';
    }),
      build.addCase(reArrangeFirebase.fulfilled, (state) => {
        console.log(state);
        state.state = 'fulfilled';
      }),
      build.addCase(reArrangeFirebase.rejected, (state, action: any) => {
        state.error = action;
        state.state = 'rejected';
      });
  },
});

export default reArrange.reducer;
