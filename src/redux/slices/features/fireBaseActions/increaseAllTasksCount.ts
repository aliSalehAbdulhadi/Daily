import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../../container/firebase';

//deprecated into addTaskSlice
export const increaseAllTasksCount = createAsyncThunk(
  'increaseAllTasksCount',
  async ({
    userUid,
    allTasksCount,
  }: {
    userUid: string;
    allTasksCount: number;
  }) => {
    const docRef = doc(db, 'userData', userUid);
    await updateDoc(docRef, {
      allTasksCount: allTasksCount,
    });
  },
);
