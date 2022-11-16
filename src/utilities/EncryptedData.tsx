import { decrypt } from 'n-krypta';
import { RootState, useAppSelector } from '../interfaces/interfaces';
import { encryptKey } from './encryptKey';

export const UserKey = () => {
  const encryptedUser = useAppSelector(
    (state: RootState) => state.userReducer.userUid,
  );
  const user = decrypt(encryptedUser, encryptKey);

  return user;
};
