import { useEffect, useState } from "react";
import { clearSignInState } from "../redux/slices/authentication/signInSlice";
import { useAppDispatch, useAppSelector } from "../interfaces/interfaces";
import { clearSignUpState } from "../redux/slices/authentication/signUpSlice";

const useCheckStatus = ({ setOpen }: { setOpen: Function }) => {
  const [pending, setPending] = useState<boolean>(false);
  const [fulfilled, setFulfilled] = useState<boolean>(false);
  const [rejected, setRejected] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useAppDispatch();

  const signInError = useAppSelector(
    (state: any) => state.signInReducer?.error?.payload?.message,
  );
  const signInStatus = useAppSelector(
    (state: any) => state.signInReducer?.state,
  );
  const signUpStatus = useAppSelector(
    (state: any) => state.signUpReducer?.state,
  );

  useEffect(() => {
    if (signInStatus && signUpStatus === "pending") {
      setPending(true);
      setTimeout(() => {
        setPending(false);
      }, 500);
    }

    if (signInStatus && signUpStatus === "fulfilled") {
      setFulfilled(true);
      setRejected(false);
      setErrorMessage("");

      setTimeout(() => {
        setOpen(false);
        setFulfilled(false);
      }, 500);
    }

    if (signInStatus && signUpStatus === "rejected") {
      setRejected(true);
      if (signInError === "Firebase: Error (auth/wrong-password).") {
        setErrorMessage("Wrong Password");
      }
      if (signInError === "Firebase: Error (auth/user-not-found).") {
        setErrorMessage("User Not Found");
      }

      if (signInError.indexOf("auth/too-many-requests") > -1) {
        setErrorMessage("Too Many Attempts");
      }
      if (signInError === "Firebase: Error (auth/email-already-in-use).") {
        setErrorMessage("Email Already Exists");
      }

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }

    return () => {
      dispatch(clearSignInState());
      dispatch(clearSignUpState());
    };
  }, [setOpen, signInStatus, signInError, signUpStatus, dispatch]);

  return [pending, fulfilled, rejected, errorMessage];
};

export default useCheckStatus;
