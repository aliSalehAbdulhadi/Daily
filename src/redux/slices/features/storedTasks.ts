import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../container/firebase';

export const storedTasks = createAsyncThunk(
  'storedTasks',
  async ({ userUid }: { userUid: string }) => {
    try {
      const docRef = doc(db, 'userData', userUid);
      const docData = getDoc(docRef).then((doc) => ({
        ...doc.data(),
      }));
      return docData;
    } catch (err) {
      return err;
    }
  },
);

const storedTasksSlice = createSlice({
  name: 'storedTasks',
  initialState: {
    tasks: [],
    error: [],
    status: '',
  },
  reducers: {},

  extraReducers(build) {
    build.addCase(storedTasks.pending, (state) => {
      state.status = 'pending';
    }),
      build.addCase(storedTasks.fulfilled, (state, action: any) => {
        state.status = 'fulfilled';
        state.tasks = action.payload?.userData?.tasks;
      }),
      build.addCase(storedTasks.rejected, (state, action: any) => {
        state.error = action.error.message;
        state.status = 'rejected';
      });
  },
});

export default storedTasksSlice.reducer;
