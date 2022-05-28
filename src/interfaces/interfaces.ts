import store from "../redux/store/store";

export interface ModalInterface {
  label: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
}

export interface SignInInterface {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SignUpInterface {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TaskSlice {
  state: {
    tasks: [];
  };
}

export type RootState = ReturnType<typeof store.getState>;
