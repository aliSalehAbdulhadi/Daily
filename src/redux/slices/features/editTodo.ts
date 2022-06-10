import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../container/firebase";
import { SingleTodoInterface } from "../../../interfaces/interfaces";

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
    allTodos: SingleTodoInterface[];
    newTodo: string;
  }) => {
    const docRef = doc(db, "userData", userUid);
    await updateDoc(docRef, {
      userData: {
        todos: allTodos.map((todo: SingleTodoInterface) =>
          todo.id === todoId ? { ...todo, content: newTodo } : todo,
        ),
      },
    });
  },
);
