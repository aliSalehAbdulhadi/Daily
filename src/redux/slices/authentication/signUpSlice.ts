import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialState } from '../../../interfaces/interfaces';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../container/firebase';

export const signUpThunk = createAsyncThunk(
  'user/signUp',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      return rejectWithValue(err);
    }
  },
);

const initialState: initialState = {
  error: [],
  state: '',
};
const signUpSlice = createSlice({
  name: 'signUpSlice',
  initialState,
  reducers: {
    clearSignUpState: (state: any) => {
      state.state = '';
      state.error = [];
    },
  },

  extraReducers(build) {
    build.addCase(signUpThunk.pending, (state) => {
      state.state = 'pending';
    });
    build.addCase(signUpThunk.fulfilled, (state) => {
      state.state = 'fulfilled';
    });
    build.addCase(signUpThunk.rejected, (state, action: any) => {
      state.error = action.error.message;
      state.state = 'rejected';
    });
  },
});

export default signUpSlice.reducer;
export const { clearSignUpState } = signUpSlice.actions;
