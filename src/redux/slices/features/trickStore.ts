import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const trickStore = createAsyncThunk(
  'trickStore',
  async ({ trick }: { trick: string }) => {
    try {
      const trickData = await trick;

      return trickData;
    } catch (err) {
      return err;
    }
  },
);

const trickStoreSlice = createSlice({
  name: 'trickStore',
  initialState: {
    tasks: [],
    error: [],
    status: '',
  },
  reducers: {},

  extraReducers(build) {
    build.addCase(trickStore.pending, (state) => {
      state.status = 'pending';
    }),
      build.addCase(trickStore.fulfilled, (state, action: any) => {
        state.status = 'fulfilled';
        state.tasks = action.payload?.userData?.tasks;
      }),
      build.addCase(trickStore.rejected, (state, action: any) => {
        state.error = action.error.message;
        state.status = 'rejected';
      });
  },
});

export default trickStoreSlice.reducer;
