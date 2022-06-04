import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../../container/firebase";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { initialState } from "../../../interfaces/interfaces";
import { SingeTodoInterface } from "../../../interfaces/interfaces";

export const addTodo = createAsyncThunk(
  "addTodo/bookmark",
  async ({ todo, userUid }: { todo: SingeTodoInterface; userUid: string }) => {
    await setDoc(
      doc(db, "userData", userUid),
      { todos: arrayUnion(todo) },
      { merge: true },
    );
  },
);

const initialState: initialState = {
  error: [],
  state: "",
};

const SignInSlice = createSlice({
  name: "SignInSlice",
  initialState,
  reducers: {},
  extraReducers(build) {
    build.addCase(addTodo.pending, (state: { error: {}[]; state: string }) => {
      state.state = "pending";
    }),
      build.addCase(
        addTodo.fulfilled,
        (state: { error: {}[]; state: string }) => {
          state.state = "fulfilled";
        },
      ),
      build.addCase(
        addTodo.rejected,
        (state: { error: {}[]; state: string }, action: any) => {
          state.error = action.error.message;
          state.state = "rejected";
        },
      );
  },
});

export default SignInSlice.reducer;
