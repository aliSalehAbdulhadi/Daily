import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../container/firebase";
import { updateDoc, doc } from "firebase/firestore";

export const removeTodo = createAsyncThunk(
  "removeTodo/bookmark",
  async ({
    userUid,
    todoId,
    allTodos,
  }: {
    userUid: string;
    todoId: string;
    allTodos: any;
  }) => {
    const docRef = doc(db, "userData", userUid);
    await updateDoc(docRef, {
      todos: allTodos.filter((todo: any) => {
        if (todo.id === todoId) {
          return false;
        } else {
          return true;
        }
      }),
    });
  },
);
