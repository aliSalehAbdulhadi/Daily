import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../container/firebase';
import { SingleTodoInterface } from '../../../interfaces/interfaces';
import { initialState } from '../../../interfaces/interfaces';

export const reArrangeFirebase = createAsyncThunk(
  'reArrangeFirebase/bookmark',
  async ({
    userUid,
    allTodos,
  }: {
    userUid: string;
    allTodos: SingleTodoInterface[];
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      userData: { todos: allTodos },
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
