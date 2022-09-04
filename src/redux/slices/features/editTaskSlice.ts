import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../container/firebase';
import { SingleTaskInterface } from '../../../interfaces/interfaces';

export const editTask = createAsyncThunk(
  'editTask/bookmark',
  async ({
    userUid,
    taskId,
    allTasks,
    newTask,
  }: {
    userUid: string;
    taskId: string;
    allTasks: SingleTaskInterface[];
    newTask: string;
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      userData: {
        tasks: allTasks.map((task: SingleTaskInterface) =>
          task.id === taskId ? { ...task, content: newTask } : task,
        ),
      },
    });
  },
);
