import { useSelector } from 'react-redux';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import store from '../redux/store/store';

export interface ModalInterface {
  label: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeable?: boolean;
  children: React.ReactNode;
}

export interface FieldPropsInterface {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  autoComplete: string;
  className: string;
  classNameField?: string;
}

export interface SignInInterface {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  setResetPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SignUpInterface {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserInfo {
  userName?: string;
  email: string;
  password: string;
}

export interface initialState {
  error: [];
  state: string;
}

export interface SingleTaskInterface {
  id: string;
  content: string;
  completed: boolean;
  taskType: string;
  date: string;
  important: boolean;
  locked: boolean;
  milestones: object[];
  dueDate: string;
}

export interface singleMilestoneInterface {
  id: string;
  milestoneCompleted: boolean;
  milestoneContent: string;
  milestoneDate: string;
}

export interface AsyncThunkConfig {
  /** return type for `thunkApi.getState` */
  state?: unknown;
  /** type for `thunkApi.dispatch` */
  dispatch?: unknown;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown;
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: unknown;
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
