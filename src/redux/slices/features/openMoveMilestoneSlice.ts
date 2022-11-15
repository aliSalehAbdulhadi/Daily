import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isMoveMilestoneModalOpen: false,
};

const openMoveMilestone = createSlice({
  name: 'openMoveMilestone',
  initialState,
  reducers: {
    toggleOpenMoveMilestone: (
      state: { isMoveMilestoneModalOpen: boolean },
      action: PayloadAction<boolean>,
    ) => {
      state.isMoveMilestoneModalOpen = action.payload;
    },
  },
});

export const { toggleOpenMoveMilestone } = openMoveMilestone.actions;

export default openMoveMilestone.reducer;
