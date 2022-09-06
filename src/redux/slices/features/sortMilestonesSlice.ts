import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  sortMilestones: 'newMilestones',
};

const sortMilestones = createSlice({
  name: 'sortMilestones',
  initialState,
  reducers: {
    sortMilestonesBy: (
      state: { sortMilestones: string },
      action: PayloadAction<string>,
    ) => {
      state.sortMilestones = action.payload;
    },
  },
});

export const { sortMilestonesBy } = sortMilestones.actions;

export default sortMilestones.reducer;
