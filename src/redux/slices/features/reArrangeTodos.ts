import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../container/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { SingeTodoInterface } from "../../../interfaces/interfaces";

export const reArrangeFirebase = createAsyncThunk(
  "reArrangeFirebase/bookmark",
  async ({
    userUid,
    allTodos,
  }: {
    userUid: string;
    allTodos: SingeTodoInterface[];
  }) => {
    const docRef = doc(db, "userData", userUid);
    await updateDoc(docRef, {
      userData: { todos: allTodos },
    });
  },
);
