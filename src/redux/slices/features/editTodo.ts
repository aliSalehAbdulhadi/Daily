import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../container/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { SingeTodoInterface } from "../../../interfaces/interfaces";

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
    allTodos: SingeTodoInterface[];
    newTodo: string;
  }) => {
    const docRef = doc(db, "userData", userUid);
    await updateDoc(docRef, {
      userData: {
        todos: allTodos.map((todo: SingeTodoInterface) =>
          todo.id === todoId ? { ...todo, content: newTodo } : todo,
        ),
      },
    });
  },
);

//edit delete username fix bug
