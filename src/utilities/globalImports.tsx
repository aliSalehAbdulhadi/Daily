import { decrypt } from 'n-krypta';
import {
  RootState,
  SingleTaskInterface,
  useAppSelector,
} from '../interfaces/interfaces';
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

export const Dark = () => {
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  return dark;
};

export const Tasks = () => {
  const tasks = useAppSelector(
    (state: RootState) => state?.getTaskReducer?.tasks,
  );

  return tasks;
};

export const PendingTasks = () => {
  const pendingTasks = Tasks()
    ? Tasks()?.filter((task: SingleTaskInterface) => !task?.completed)
    : [];

  return pendingTasks;
};

export const CompletedTasks = () => {
  const completedTasks = Tasks()
    ? Tasks()?.filter((task: SingleTaskInterface) => task?.completed)
    : [];

  return completedTasks;
};

export const ImportantTasks = () => {
  const importantTasks = Tasks()?.filter(
    (task: SingleTaskInterface) => task?.important,
  );

  return importantTasks;
};
