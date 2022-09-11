import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  milestonePunctCheckbox: false,
};

export const milestonePunctCheckboxSlice = createSlice({
  name: 'milestonePunctCheckbox',
  initialState,
  reducers: {
    punctCheckboxAction: (
      state: { milestonePunctCheckbox: boolean },
      action: PayloadAction<boolean>,
    ) => {
      state.milestonePunctCheckbox = action.payload;
    },
  },
});

export const { punctCheckboxAction } = milestonePunctCheckboxSlice.actions;
export default milestonePunctCheckboxSlice.reducer;
