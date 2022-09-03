import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../container/firebase';
import { SingleTodoInterface } from '../../../interfaces/interfaces';

export const changeTaskImportantState = createAsyncThunk(
  'changeTaskImportantState/bookmark',
  async ({
    userUid,
    todoId,
    allTodos,
  }: {
    userUid: string;
    todoId: string;
    allTodos: SingleTodoInterface[];
  }) => {
    const docRef = doc(db, 'userData', userUid);

    await updateDoc(docRef, {
      userData: {
        todos: allTodos.map((todo: SingleTodoInterface) =>
          todo.id === todoId ? { ...todo, important: !todo.important } : todo,
        ),
      },
    });
  },
);
