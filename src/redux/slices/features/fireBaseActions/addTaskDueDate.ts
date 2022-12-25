import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../../container/firebase';
import { SingleTaskInterface } from '../../../../interfaces/interfaces';

export const addTaskDueDate = createAsyncThunk(
  'addTaskDueDate',
  async ({
    userUid,
    taskId,
    allTasks,
    dueDate,
  }: {
    userUid: string;
    taskId: string;
    allTasks: SingleTaskInterface[];
    dueDate: string;
  }) => {
    const docRef = doc(db, 'userData', userUid);

    await updateDoc(docRef, {
      userData: {
        tasks: allTasks.map((task: SingleTaskInterface) =>
          task.id === taskId ? { ...task, dueDate: dueDate } : task,
        ),
      },
    });
  },
);
