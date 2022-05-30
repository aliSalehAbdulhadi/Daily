import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../../container/firebase";
import { getDoc, doc } from "firebase/firestore";

export const getTodo = createAsyncThunk(
  "getTodos",
  async ({ userUid }: { userUid: string }) => {
    try {
      const docRef = doc(db, "userData", userUid);
      const docData = getDoc(docRef).then((doc) => ({
        ...doc.data(),
      }));
      return docData;
    } catch (err) {}
  },
);

const getTodosSlice = createSlice({
  name: "getTodos",
  initialState: {
    todos: [],
    error: [],
    status: "",
  },
  reducers: {},
  extraReducers(build) {
    build.addCase(getTodo.pending, (state) => {
      state.status = "pending";
    }),
      build.addCase(getTodo.fulfilled, (state, action: any) => {
        state.status = "fulfilled";
        state.todos = action.payload?.todos;
      }),
      build.addCase(getTodo.rejected, (state, action: any) => {
        state.error = action.error.message;
        state.status = "rejected";
      });
  },
});

export default getTodosSlice.reducer;
