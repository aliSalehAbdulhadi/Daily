import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../container/firebase";
import { updateDoc, doc } from "firebase/firestore";

export const editTodo = createAsyncThunk(
  "editTodo/bookmark",
  async ({
    userUid,
    todoId,
    allTodos,
    newTodo,
  }: {
    userUid: string;
    todoId: string;
    allTodos: any;
    newTodo: string;
  }) => {
    const docRef = doc(db, "userData", userUid);
    await updateDoc(docRef, {
      todos: allTodos.map((todo: any) =>
        todo.id === todoId ? { ...todo, content: newTodo } : todo,
      ),
    });
  },
);
