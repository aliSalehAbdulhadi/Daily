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

    dbTasksAddTask: (
      state: any,
      action: PayloadAction<SingleTaskInterface>,
    ) => {
      state.tasks?.unshift(action.payload);
    },

    dbTasksDeleteTask: (
      state: any,
      action: PayloadAction<{
        taskId: string;
      }>,
    ) => {
      state.tasks = state.tasks?.filter(
        (task: SingleTaskInterface) => task.id !== action.payload.taskId,
      );
    },
    dbTasksCompleteTaskLocally: (
      state: {
        tasks: SingleTaskInterface[];
        error: {}[];
        status: string;
      },
      action: PayloadAction<{ taskId: string }>,
    ) => {
      state.tasks = state.tasks?.map((task: SingleTaskInterface) => {
        if (task.id === action.payload.taskId) {
          task.completed = !task.completed;
          task.important = false;
        }
        return task;
      });
    },
    dbTasksEditTaskLocally: (
      state: {
        tasks: SingleTaskInterface[];
        error: {}[];
        status: string;
      },
      action: PayloadAction<{ taskId: string; taskEdit: string }>,
    ) => {
      state.tasks = state.tasks?.map((task: SingleTaskInterface) => {
        if (task.id === action.payload.taskId) {
          task.content = action.payload.taskEdit;
        }
        return task;
      });
    },

    dbTasksAddTaskTypeLocally: (
      state: {
        tasks: SingleTaskInterface[];
        error: {}[];
        status: string;
      },
      action: PayloadAction<{ taskId: string; taskType: string }>,
    ) => {
      state.tasks = state.tasks?.map((task: SingleTaskInterface) => {
        return task.id === action.payload.taskId
          ? { ...task, taskType: action.payload.taskType }
          : task;
      });
    },

    dbTasksChangeTaskImportantStateLocally: (
      state: {
        tasks: SingleTaskInterface[];
        error: {}[];
        status: string;
      },
      action: PayloadAction<{ taskId: string }>,
    ) => {
      state.tasks = state.tasks?.map((task: SingleTaskInterface) => {
        return task.id === action.payload.taskId
          ? { ...task, important: !task.important }
          : task;
      });
    },

    dbTasksLockTaskLocally: (
      state: {
        tasks: SingleTaskInterface[];
        error: {}[];
        status: string;
      },
      action: PayloadAction<{ taskId: string }>,
    ) => {
      state.tasks = state.tasks?.map((task: SingleTaskInterface) => {
        return task.id === action.payload.taskId
          ? { ...task, locked: !task.locked }
          : task;
      });
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

export const {
  reArrangedbTasks,
  dbTasksAddTask,
  dbTasksEditTaskLocally,
  dbTasksDeleteTask,
  dbTasksLockTaskLocally,
  dbTasksCompleteTaskLocally,
  dbTasksChangeTaskImportantStateLocally,
} = dbTasksSlice.actions;
