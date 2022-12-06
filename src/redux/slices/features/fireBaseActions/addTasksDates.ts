import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateDoc, doc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from '../../../../container/firebase';

export const addTasksDates = createAsyncThunk(
  'addTasksDates',
  async ({
    userUid,
    tasksDates,
  }: {
    userUid: string;
    tasksDates: { date: string; id: string };
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await setDoc(
      docRef,
      {
        tasksDates: arrayUnion(tasksDates),
      },
      { merge: true },
    );
  },
);

export const deleteTaskDate = createAsyncThunk(
  'deleteTaskDate',
  async ({
    userUid,
    dateId,
    allTasksDates,
  }: {
    userUid: string;
    dateId: string;
    allTasksDates: { date: string; id: string }[];
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      tasksDates: allTasksDates.filter((task: { date: string; id: string }) => {
        if (task?.id === dateId) {
          return false;
        } else {
          return true;
        }
      }),
    });
  },
);
