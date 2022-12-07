import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../../../container/firebase';
import { doc, setDoc, arrayUnion, updateDoc } from 'firebase/firestore';
import { initialState } from '../../../../interfaces/interfaces';
import { SingleTaskInterface } from '../../../../interfaces/interfaces';

export const addTask = createAsyncThunk(
  'addTask',
  async ({
    task,
    userUid,
    tasksDates,
    allTasksCount,
  }: {
    task: SingleTaskInterface;
    userUid: string;
    tasksDates: { date: string; id: string };
    allTasksCount: number;
  }) => {
    await setDoc(
      doc(db, 'userData', userUid),
      {
        tasksDates: arrayUnion(tasksDates),
        userData: {
          tasks: arrayUnion(task),
        },
        allTasksCount: allTasksCount,
      },
      { merge: true },
    );
  },
);

const initialState: initialState = {
  error: [],
  state: '',
};

const AddTaskSlice = createSlice({
  name: 'AddTaskSlice',
  initialState,
  reducers: {},
  extraReducers(build) {
    build.addCase(addTask.pending, (state: { error: {}[]; state: string }) => {
      state.state = 'pending';
    }),
      build.addCase(
        addTask.fulfilled,
        (state: { error: {}[]; state: string }) => {
          state.state = 'fulfilled';
        },
      ),
      build.addCase(
        addTask.rejected,
        (state: { error: {}[]; state: string }, action: any) => {
          state.error = action.error.message;
          state.state = 'rejected';
        },
      );
  },
});

export default AddTaskSlice.reducer;
