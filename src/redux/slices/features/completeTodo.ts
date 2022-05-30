import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../container/firebase";
import { updateDoc, doc } from "firebase/firestore";

export const completedTodo = createAsyncThunk(
  "completedTodo/bookmark",
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
      todos: allTodos.map((todo: any) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    });
  },
);
