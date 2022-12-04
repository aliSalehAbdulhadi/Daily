import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  disableSwiper: false,
};

const disableSwiper = createSlice({
  name: 'disableSwiper',
  initialState,
  reducers: {
    toggleDisableSwiper: (
      state: { disableSwiper: boolean },
      action: PayloadAction<boolean>,
    ) => {
      state.disableSwiper = action.payload;
    },
  },
});

export const { toggleDisableSwiper } = disableSwiper.actions;

export default disableSwiper.reducer;
