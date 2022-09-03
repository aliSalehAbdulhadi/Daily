import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../container/firebase';
import { SingleTodoInterface } from '../../../interfaces/interfaces';

export const addTaskType = createAsyncThunk(
  'addTaskType/bookmark',
  async ({
    userUid,
    taskId,
    allTasks,
    taskType,
  }: {
    userUid: string;
    taskId: string;
    allTasks: SingleTodoInterface[];
    taskType: string;
  }) => {
    const docRef = doc(db, 'userData', userUid);

    await updateDoc(docRef, {
      userData: {
        todos: allTasks.map((task: SingleTodoInterface) =>
          task.id === taskId ? { ...task, taskType: taskType } : task,
        ),
      },
    });
  },
);
