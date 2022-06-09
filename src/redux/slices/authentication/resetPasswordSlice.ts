import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../container/firebase";

export const resetPasswordThunk = createAsyncThunk(
  "user/resetPassword",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const initialState = {
  error: [],
  state: "",
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    clearPasswordState: (state: any) => {
      state.error = [];
      state.state = "";
    },
  },
  extraReducers(build) {
    build.addCase(resetPasswordThunk.pending, (state) => {
      state.state = "pending";
    }),
      build.addCase(resetPasswordThunk.fulfilled, (state) => {
        state.state = "fulfilled";
      }),
      build.addCase(resetPasswordThunk.rejected, (state, action: any) => {
        state.error = action.payload?.code;
        state.state = "rejected";
      });
  },
});

export default resetPasswordSlice.reducer;
export const { clearPasswordState } = resetPasswordSlice.actions;
