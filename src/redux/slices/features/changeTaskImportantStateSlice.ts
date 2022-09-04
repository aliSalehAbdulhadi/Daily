import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../container/firebase';
import { SingleTaskInterface } from '../../../interfaces/interfaces';

export const changeTaskImportantState = createAsyncThunk(
  'changeTaskImportantState/bookmark',
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
        tasks: allTasks.map((task: SingleTaskInterface) =>
          task.id === taskId ? { ...task, important: !task.important } : task,
        ),
      },
    });
  },
);
