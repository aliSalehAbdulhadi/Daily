import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../container/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { SingeTodoInterface } from "../../../interfaces/interfaces";

export const completedTodo = createAsyncThunk(
  "completedTodo/bookmark",
  async ({
    userUid,
    todoId,
    allTodos,
  }: {
    userUid: string;
    todoId: string;
    allTodos: SingeTodoInterface[];
  }) => {
    const docRef = doc(db, "userData", userUid);

    await updateDoc(docRef, {
      userData: {
        todos: allTodos.map((todo: SingeTodoInterface) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
        ),
      },
    });
  },
);
