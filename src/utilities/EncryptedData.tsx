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

export const DecryptedUserName = () => {
  const encryptedUserName = useAppSelector(
    (state: RootState) => state.getTaskReducer.userName,
  );
  const userName = decrypt(encryptedUserName, encryptKey);

  return userName;
};

export const Tasks = () => {
  const encryptedTasks = useAppSelector(
    (state: RootState) => state.getTaskReducer?.tasks,
  );
  // const tasks = decrypt(encryptedTasks, encryptKey);

  return encryptedTasks;
};
