import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../../container/firebase';
import {
  singleMilestoneInterface,
  SingleTaskInterface,
} from '../../../../interfaces/interfaces';

export const addMilestones = createAsyncThunk(
  'addMilestones',
  async ({
    userUid,
    taskId,
    allTasks,
    milestone,
  }: {
    userUid: string;
    taskId: string;
    milestone: singleMilestoneInterface;
    allTasks: SingleTaskInterface[];
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      userData: {
        tasks: allTasks.map((task: SingleTaskInterface) =>
          task.id === taskId
            ? {
                ...task,
                milestones: [...task.milestones, milestone],
              }
            : task,
        ),
      },
    });
  },
);

export const completeMilestone = createAsyncThunk(
  'completeMilestone/bookmark',
  async ({
    userUid,
    taskId,
    allTasks,
    milestone,
  }: {
    userUid: string;
    taskId: any;
    milestone: singleMilestoneInterface;
    allTasks: SingleTaskInterface[];
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      userData: {
        tasks: allTasks.map((task: SingleTaskInterface) =>
          task.id === taskId
            ? {
                ...task,
                milestones: task.milestones.map((ms: any) => {
                  if (ms.id === milestone.id) {
                    return {
                      ...ms,
                      milestoneCompleted: !ms.milestoneCompleted,
                    };
                  }
                  return ms;
                }),
              }
            : task,
        ),
      },
    });
  },
);

export const deleteMilestone = createAsyncThunk(
  'deleteMilestone/bookmark',
  async ({
    userUid,
    taskId,
    allTasks,
    milestoneId,
  }: {
    userUid: string;
    taskId: any;
    milestoneId: string;
    allTasks: SingleTaskInterface[];
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      userData: {
        tasks: allTasks.map((task: SingleTaskInterface) =>
          task.id === taskId
            ? {
                ...task,
                milestones: task.milestones.filter((ms: any) => {
                  if (milestoneId === ms.id) {
                    return false;
                  } else {
                    return true;
                  }
                }),
              }
            : task,
        ),
      },
    });
  },
);

export const editMilestone = createAsyncThunk(
  'editMilestone/bookmark',
  async ({
    userUid,
    taskId,
    allTasks,
    milestone,
    milestoneEdit,
  }: {
    userUid: string;
    taskId: any;
    milestone: singleMilestoneInterface;
    milestoneEdit: string;
    allTasks: SingleTaskInterface[];
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      userData: {
        tasks: allTasks.map((task: SingleTaskInterface) =>
          task.id === taskId
            ? {
                ...task,
                milestones: task.milestones.map((ms: any) => {
                  if (ms.id === milestone.id) {
                    return {
                      ...ms,
                      milestoneContent: milestoneEdit,
                    };
                  }
                  return ms;
                }),
              }
            : task,
        ),
      },
    });
  },
);

export const deleteAllFinishedMilestone = createAsyncThunk(
  'deleteMilestone/bookmark',
  async ({
    userUid,
    taskId,
    allTasks,
  }: {
    userUid: string;
    taskId: any;
    allTasks: SingleTaskInterface[];
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      userData: {
        tasks: allTasks.map((task: SingleTaskInterface) =>
          task.id === taskId
            ? {
                ...task,
                milestones: task.milestones.filter(
                  (ms: any) => !ms.milestoneCompleted,
                ),
              }
            : task,
        ),
      },
    });
  },
);
