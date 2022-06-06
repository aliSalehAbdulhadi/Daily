import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../../container/firebase";
import { doc, setDoc } from "firebase/firestore";
import { initialState } from "../../../interfaces/interfaces";

export const addUsername = createAsyncThunk(
  "addUsername",
  async ({ userName, userUid }: { userUid: string; userName: string }) => {
    await setDoc(
      doc(db, "userData", userUid),
      { todo: userName },
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
    build.addCase(
      addUsername.pending,
      (state: { error: {}[]; state: string }) => {
        state.state = "pending";
      },
    ),
      build.addCase(
        addUsername.fulfilled,
        (state: { error: {}[]; state: string }) => {
          state.state = "fulfilled";
        },
      ),
      build.addCase(
        addUsername.rejected,
        (state: { error: {}[]; state: string }, action: any) => {
          state.error = action.error.message;
          state.state = "rejected";
        },
      );
  },
});

export default SignInSlice.reducer;
