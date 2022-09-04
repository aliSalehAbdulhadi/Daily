import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../container/firebase';
import { SingleTaskInterface } from '../../../interfaces/interfaces';

export const removeTask = createAsyncThunk(
  'removeTask/bookmark',
  async ({
    userUid,
    taskId,
    allTasks,
  }: {
    userUid: string;
    taskId: string;
    allTasks: SingleTaskInterface[];
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      userData: {
        tasks: allTasks.filter((task: SingleTaskInterface) => {
          if (task.id === taskId) {
            return false;
          } else {
            return true;
          }
        }),
      },
    });
  },
);
