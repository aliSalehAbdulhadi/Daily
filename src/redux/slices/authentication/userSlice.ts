import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userUid: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserUid: (state: any, action: PayloadAction<any>) => {
      state.userUid = action.payload;
    },
  },
});

export const { setUserUid } = userSlice.actions;

export default userSlice.reducer;
