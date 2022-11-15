import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { singleMilestoneInterface } from '../../../interfaces/interfaces';

const initialState = {
  selectedMilestone: {},
};

const selectedMilestone = createSlice({
  name: 'selectedMilestone',
  initialState,
  reducers: {
    setSelectedMilestone: (
      state: { selectedMilestone: {} },
      action: PayloadAction<singleMilestoneInterface>,
    ) => {
      state.selectedMilestone = action.payload;
    },
  },
});

export const { setSelectedMilestone } = selectedMilestone.actions;

export default selectedMilestone.reducer;
