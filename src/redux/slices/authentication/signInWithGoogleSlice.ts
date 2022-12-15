import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialState } from '../../../interfaces/interfaces';
import {
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { auth } from '../../../container/firebase';

export const signInWithGoogle = createAsyncThunk(
  'user/signUp',
  async ({}, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (err: any) {
      return rejectWithValue(err);
    }
  },
);

const initialState: initialState = {
  error: [],
  state: '',
};

const SignInWithGoogleSlice = createSlice({
  name: 'SignInSlice',
  initialState,
  reducers: {},
  extraReducers(build) {
    build.addCase(signInWithGoogle.pending, (state) => {
      state.state = 'pending';
    }),
      build.addCase(signInWithGoogle.fulfilled, (state) => {
        state.state = 'fulfilled';
      }),
      build.addCase(signInWithGoogle.rejected, (state, action: any) => {
        state.error = action;
        state.state = 'rejected';
      });
  },
});
export default SignInWithGoogleSlice.reducer;
