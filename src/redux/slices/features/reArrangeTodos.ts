import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../container/firebase";
import { SingleTodoInterface } from "../../../interfaces/interfaces";

export const reArrangeFirebase = createAsyncThunk(
  "reArrangeFirebase/bookmark",
  async ({
    userUid,
    allTodos,
  }: {
    userUid: string;
    allTodos: SingleTodoInterface[];
  }) => {
    const docRef = doc(db, "userData", userUid);
    await updateDoc(docRef, {
      userData: { todos: allTodos },
    });
  },
);
