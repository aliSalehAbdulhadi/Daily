import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../container/firebase";

export const changeUserName = createAsyncThunk(
  "changeUserName/bookmark",
  async ({
    userUid,
    newUserName,
  }: {
    userUid: string;
    newUserName: string;
  }) => {
    const docRef = doc(db, "userData", userUid);
    await updateDoc(docRef, {
      userName: newUserName,
    });
  },
);
