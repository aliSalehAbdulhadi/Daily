import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { encrypt } from 'n-krypta';
import { encryptKey } from '../../../utilities/encryptKey';
const initialState = {
  userUid: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserUid: (state: any, action: PayloadAction<any>) => {
      state.userUid = action.payload ? encrypt(action.payload, encryptKey) : '';
    },
  },
});

export const { setUserUid } = userSlice.actions;

export default userSlice.reducer;
