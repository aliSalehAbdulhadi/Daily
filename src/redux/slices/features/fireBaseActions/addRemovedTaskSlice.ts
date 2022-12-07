import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../../../container/firebase';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { initialState } from '../../../../interfaces/interfaces';
import { SingleTaskInterface } from '../../../../interfaces/interfaces';

//not used yet
export const addRemovedTask = createAsyncThunk(
  'addRemovedTask',
  async ({ task, userUid }: { task: SingleTaskInterface; userUid: string }) => {
    await setDoc(
      doc(db, 'userData', userUid),
      { userData: { removedTasks: arrayUnion(task) } },
      { merge: true },
    );
  },
);

const initialState: initialState = {
  error: [],
  state: '',
};

const addRemovedTaskSlice = createSlice({
  name: 'addRemovedTaskSlice',
  initialState,
  reducers: {},
  extraReducers(build) {
    build.addCase(
      addRemovedTask.pending,
      (state: { error: {}[]; state: string }) => {
        state.state = 'pending';
      },
    ),
      build.addCase(
        addRemovedTask.fulfilled,
        (state: { error: {}[]; state: string }) => {
          state.state = 'fulfilled';
        },
      ),
      build.addCase(
        addRemovedTask.rejected,
        (state: { error: {}[]; state: string }, action: any) => {
          state.error = action.error.message;
          state.state = 'rejected';
        },
      );
  },
});

export default addRemovedTaskSlice.reducer;
