import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  OpenMilestonePanel: false,
};

const OpenMilestonePanel = createSlice({
  name: 'OpenMilestonePanel',
  initialState,
  reducers: {
    toggleOpenMilestonePanel: (
      state: { OpenMilestonePanel: boolean },
      action: PayloadAction<boolean>,
    ) => {
      state.OpenMilestonePanel = action.payload;
    },
  },
});

export const { toggleOpenMilestonePanel } = OpenMilestonePanel.actions;

export default OpenMilestonePanel.reducer;
