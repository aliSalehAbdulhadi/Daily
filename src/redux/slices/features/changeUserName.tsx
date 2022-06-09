import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../container/firebase";
import { updateDoc, doc } from "firebase/firestore";

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
