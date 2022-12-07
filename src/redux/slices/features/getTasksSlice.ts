import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDoc, doc } from 'firebase/firestore';
import { encrypt } from 'n-krypta';
import { db } from '../../../container/firebase';
import { SingleTaskInterface } from '../../../interfaces/interfaces';
import { encryptKey } from '../../../utilities/encryptKey';

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
    tasksDates: [],
    allTasksCount: 0,
    error: [],
    status: '',
    isAddingTask: false,
  },
  reducers: {
    resetTaskStatus: (state: any) => {
      state.status = '';
    },

    changeUsernameLocally: (state: any, action: PayloadAction<string>) => {
      state.userName = action?.payload;
    },

    addTasksLocally: (
      state: any,
      action: PayloadAction<SingleTaskInterface>,
    ) => {
      state.tasks?.unshift(action.payload);
      state.isAddingTask = !state.isAddingTask;
      state.allTasksCount++;
    },
    deleteTasksLocally: (
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

    editTaskLocally: (
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

    lockTaskLocally: (
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

    reArrangeTasksLocally: (
      state: {
        tasks: SingleTaskInterface[];
        error: {}[];
        status: string;
      },
      action: PayloadAction<SingleTaskInterface[]>,
    ) => {
      state.tasks = action.payload;
    },
    addTasksDatesLocally: (state: any, action: any) => {
      state?.tasksDates?.unshift(action?.payload);
    },
    deleteTaskDateLocally: (
      state: any,
      action: PayloadAction<{
        dateId: string;
      }>,
    ) => {
      state.tasksDates = state.tasksDates?.filter(
        (task: SingleTaskInterface) => task.id !== action.payload.dateId,
      );
    },

    addMilestoneLocally: (
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

    deleteAllFinishedMilestoneLocally: (
      state: any,
      action: PayloadAction<{
        taskId: any;
      }>,
    ) => {
      state.tasks = state.tasks?.map((task: SingleTaskInterface) => {
        if (task.id === action.payload.taskId) {
          task.milestones = task.milestones?.filter(
            (milestone: any) => !milestone.milestoneCompleted,
          );
        }
        return task;
      });
    },
  },

  extraReducers(build) {
    build.addCase(getTasks?.pending, (state) => {
      state.status = 'pending';
    }),
      build.addCase(getTasks?.fulfilled, (state, action: any) => {
        state.status = 'fulfilled';
        state.tasks = action?.payload?.userData?.tasks;
        state.allTasksCount = action?.payload?.allTasksCount;

        state.tasksDates = action?.payload?.tasksDates;
        state.userName = action?.payload?.userName
          ? encrypt(action?.payload?.userName, encryptKey)
          : '';
      }),
      build.addCase(getTasks?.rejected, (state, action: any) => {
        state.error = action.error.message;
        state.status = 'rejected';
      });
  },
});

export default getTasksSlice.reducer;
export const {
  resetTaskStatus,
  changeUsernameLocally,
  addTasksLocally,
  deleteTasksLocally,
  completeTaskLocally,
  editTaskLocally,
  reArrangeTasksLocally,
  addTasksDatesLocally,
  deleteTaskDateLocally,
  addMilestoneLocally,
  completeMilestoneLocally,
  lockTaskLocally,
  deleteMilestoneLocally,
  editMilestoneLocally,
  addTaskTypeLocally,
  changeTaskImportantStateLocally,
  deleteAllFinishedMilestoneLocally,
} = getTasksSlice.actions;
