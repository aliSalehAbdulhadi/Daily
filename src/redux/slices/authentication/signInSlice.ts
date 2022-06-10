import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../../../interfaces/interfaces";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../container/firebase";

export const signInThunk = createAsyncThunk(
  "user/signUp",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      return rejectWithValue(err);
    }
  },
);

const initialState: initialState = {
  error: [],
  state: "",
};

const SignInSlice = createSlice({
  name: "SignInSlice",
  initialState,
  reducers: {
    clearSignInState: (state: any) => {
      state.state = "";
      state.error = [];
    },
  },
  extraReducers(build) {
    build.addCase(signInThunk.pending, (state) => {
      state.state = "pending";
    }),
      build.addCase(signInThunk.fulfilled, (state) => {
        state.state = "fulfilled";
      }),
      build.addCase(signInThunk.rejected, (state, action: any) => {
        state.error = action;
        state.state = "rejected";
      });
  },
});

export default SignInSlice.reducer;
export const { clearSignInState } = SignInSlice.actions;
