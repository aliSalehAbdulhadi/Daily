import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../container/firebase';
import { SingleTaskInterface } from '../../../interfaces/interfaces';

export const dbTasks = createAsyncThunk(
  'dbTasks',
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

const dbTasksSlice = createSlice({
  name: 'dbTasks',
  initialState: {
    tasks: [],
    error: [],
    status: '',
  },
  reducers: {
    reArrangedbTasks: (
      state: {
        tasks: SingleTaskInterface[];
        error: {}[];
        status: string;
      },
      action: PayloadAction<SingleTaskInterface[]>,
    ) => {
      state.tasks = action.payload;
    },
  },

  extraReducers(build) {
    build.addCase(dbTasks.pending, (state) => {
      state.status = 'pending';
    }),
      build.addCase(dbTasks.fulfilled, (state, action: any) => {
        state.status = 'fulfilled';
        state.tasks = action.payload?.userData?.tasks;
      }),
      build.addCase(dbTasks.rejected, (state, action: any) => {
        state.error = action.error.message;
        state.status = 'rejected';
      });
  },
});

export default dbTasksSlice.reducer;

export const { reArrangedbTasks } = dbTasksSlice.actions;
