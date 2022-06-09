import { SetStateAction, useEffect, useState } from "react";
import { clearSignInState } from "../redux/slices/authentication/signInSlice";
import { useAppDispatch, useAppSelector } from "../interfaces/interfaces";
import { clearSignUpState } from "../redux/slices/authentication/signUpSlice";
import { clearPasswordState } from "../redux/slices/authentication/resetPasswordSlice";

const useCheckStatus = ({
  setOpen,
  status,
  error,
}: {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  status: string;
  error: any;
}) => {
  const [pending, setPending] = useState<boolean>(false);
  const [fulfilled, setFulfilled] = useState<boolean>(false);
  const [rejected, setRejected] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "pending") {
      setPending(true);
      setTimeout(() => {
        setPending(false);
      }, 500);
    }

    if (status === "fulfilled") {
      setFulfilled(true);
      setRejected(false);
      setErrorMessage("");

      setTimeout(() => {
        setOpen(false);
        setFulfilled(false);
      }, 500);
    }

    if (status === "rejected") {
      setRejected(true);
      if (error === "Firebase: Error (auth/wrong-password).") {
        setErrorMessage("Wrong Password");
      }
      if (error === "Firebase: Error (auth/user-not-found).") {
        setErrorMessage("User Not Found");
      }

      if (error.indexOf("auth/too-many-requests") > -1) {
        setErrorMessage("Too Many Attempts");
      }
      if (error === "Firebase: Error (auth/email-already-in-use).") {
        setErrorMessage("Email Already Exists");
      }
      if (error === "auth/user-not-found") {
        setErrorMessage("User Not Found");
      }

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }

    return () => {
      dispatch(clearSignInState());
      dispatch(clearSignUpState());
      // dispatch(clearPasswordState());
    };
  }, [setOpen, status, error, dispatch]);

  return [pending, fulfilled, rejected, errorMessage];
};

export default useCheckStatus;
