import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../container/firebase';
import { SingleTaskInterface } from '../../../interfaces/interfaces';

export const addTaskType = createAsyncThunk(
  'addTaskType',
  async ({
    userUid,
    taskId,
    allTasks,
    taskType,
  }: {
    userUid: string;
    taskId: string;
    allTasks: SingleTaskInterface[];
    taskType: string;
  }) => {
    const docRef = doc(db, 'userData', userUid);

    await updateDoc(docRef, {
      userData: {
        tasks: allTasks.map((task: SingleTaskInterface) =>
          task.id === taskId ? { ...task, taskType: taskType } : task,
        ),
      },
    });
  },
);
