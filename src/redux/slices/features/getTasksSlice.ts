import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../container/firebase';
import { SingleTaskInterface } from '../../../interfaces/interfaces';

export const getTasks = createAsyncThunk(
  'getTasks',
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

const getTasksSlice = createSlice({
  name: 'getTasks',
  initialState: {
    userName: '',
    tasks: [],
    error: [],
    status: '',
  },
  reducers: {
    setTasks: (state: any, action: PayloadAction<SingleTaskInterface>) => {
      state.tasks?.unshift(action.payload);
    },
    deleteTask: (
      state: any,
      action: PayloadAction<{
        taskId: string;
      }>,
    ) => {
      state.tasks = state.tasks?.filter(
        (task: SingleTaskInterface) => task.id !== action.payload.taskId,
      );
    },
    completeTaskLocally: (
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

    addTaskTypeLocally: (
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

    changeTaskImportantStateLocally: (
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

    reArrangeTasks: (
      state: {
        tasks: SingleTaskInterface[];
        error: {}[];
        status: string;
      },
      action: PayloadAction<SingleTaskInterface[]>,
    ) => {
      state.tasks = action.payload;
    },

    setMilestones: (
      state: any,
      action: PayloadAction<{
        taskId: string;
        milestone: any;
      }>,
    ) => {
      state.tasks = state.tasks?.map((task: SingleTaskInterface) => {
        if (task.id === action.payload.taskId) {
          task.milestones = [...task.milestones, action.payload.milestone];
        }
        return task;
      });
    },
    completeMilestoneLocally: (
      state: any,
      action: PayloadAction<{
        taskId: any;
        milestoneId: string;
      }>,
    ) => {
      state.tasks = state.tasks?.map((task: SingleTaskInterface) => {
        if (task.id === action.payload.taskId) {
          task.milestones = task.milestones?.map((milestone: any) => {
            if (milestone.id === action.payload.milestoneId) {
              milestone.milestoneCompleted = !milestone.milestoneCompleted;
            }
            return milestone;
          });
        }
        return task;
      });
    },
    deleteMilestoneLocally: (
      state: any,
      action: PayloadAction<{
        taskId: any;
        milestoneId: string;
      }>,
    ) => {
      state.tasks = state.tasks?.map((task: SingleTaskInterface) => {
        if (task.id === action.payload.taskId) {
          task.milestones = task.milestones?.filter(
            (milestone: any) => milestone.id !== action.payload.milestoneId,
          );
        }
        return task;
      });
    },

    editMilestoneLocally: (
      state: any,
      action: PayloadAction<{
        taskId: any;
        milestoneId: string;
        milestoneEdit: string;
      }>,
    ) => {
      state.tasks = state.tasks?.map((task: SingleTaskInterface) => {
        if (task.id === action.payload.taskId) {
          task.milestones.map((ms: any) => {
            if (ms?.id === action.payload.milestoneId) {
              ms.milestoneContent = action.payload.milestoneEdit;
            }
            return ms;
          });
        }
        return task;
      });
    },
  },
  extraReducers(build) {
    build.addCase(getTasks.pending, (state) => {
      state.status = 'pending';
    }),
      build.addCase(getTasks.fulfilled, (state, action: any) => {
        state.status = 'fulfilled';
        state.tasks = action.payload?.userData?.tasks;
        state.userName = action.payload?.userName;
      }),
      build.addCase(getTasks.rejected, (state, action: any) => {
        state.error = action.error.message;
        state.status = 'rejected';
      });
  },
});

export default getTasksSlice.reducer;
export const {
  setTasks,
  deleteTask,
  completeTaskLocally,
  reArrangeTasks,
  setMilestones,
  completeMilestoneLocally,
  deleteMilestoneLocally,
  editMilestoneLocally,
  addTaskTypeLocally,
  changeTaskImportantStateLocally,
} = getTasksSlice.actions;
