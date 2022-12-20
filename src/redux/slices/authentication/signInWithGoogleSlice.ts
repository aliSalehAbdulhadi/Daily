import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialState } from '../../../interfaces/interfaces';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../../container/firebase';

export const signInWithGoogle = createAsyncThunk(
  'user/signUp',
  async ({ isMobile }: { isMobile: boolean }, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });

      isMobile
        ? await signInWithRedirect(auth, provider)
        : await signInWithPopup(auth, provider);
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
