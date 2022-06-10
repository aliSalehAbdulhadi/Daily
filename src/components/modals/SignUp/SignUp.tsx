import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Modal from "../Modal/Modal";
import { SignUpInterface } from "../../../interfaces/interfaces";
import FormField from "../../FormField/FormField";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
} from "../../../interfaces/interfaces";
import { signUpThunk } from "../../../redux/slices/authentication/signUpSlice";
import { addUsername } from "../../../redux/slices/features/addUsername";
import useCheckStatus from "../../../hooks/useCheckStatus";
import { FaSpinner } from "react-icons/fa";

const signUpSchema = Yup.object().shape({
  UserName: Yup.string().min(3).max(15).required("User name is required"),
  Email: Yup.string().min(3).max(24).required("Email is required"),
  Password: Yup.string().min(6).required("Password is required"),
  PasswordConfirmation: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("Password"), null], "Password must match"),
});

const SignUp = ({ open, setOpen, setSignIn }: SignUpInterface) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const signInError = useAppSelector(
    (state: any) => state.signInReducer?.error?.payload?.message,
  );
  const signUpStatus = useAppSelector(
    (state: any) => state.signUpReducer?.state,
  );
  const [pending, fulfilled, rejected, errorMessage] = useCheckStatus({
    setOpen,
    status: signUpStatus,
    error: signInError,
  });

  const userName = useAppSelector(
    (state: RootState) => state.getTodoReducer.userName,
  );

  const [fullName, setFullName] = useState<string>(userName);
  const [submit, setSubmit] = useState<boolean>(false);
  console.log(fullName);
  useEffect(() => {
    if (submit) {
      dispatch(
        addUsername({
          userName: fullName,
          userUid: user,
        }),
      );
    }
  }, [user, dispatch, fullName, submit]);

  return (
    <Modal label="Sign Up" setOpen={setOpen} open={open}>
      <Formik
        initialValues={{
          UserName: "",
          Email: "",
          Password: "",
          PasswordConfirmation: "",
        }}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          dispatch(
            signUpThunk({ email: values.Email, password: values.Password }),
          );
          setFullName(values.UserName);
          setSubmit(true);

          setTimeout(() => {
            setSubmit(false);
          }, 3000);
        }}
      >
        {({}) => (
          <Form className="min-w-[35vh]">
            <FormField
              autoComplete="username"
              className="mb-3"
              label="User Name"
              name="UserName"
              type="text"
              placeholder="Enter Your User Name"
              value="username"
            />
            <FormField
              autoComplete="email"
              className="mb-3"
              label="Email"
              name="Email"
              type="email"
              placeholder="Enter Your Email"
              value="email"
            />
            <FormField
              autoComplete="password"
              className="mb-3"
              label="Password"
              name="Password"
              type="password"
              placeholder="Enter Your Password"
              value="password"
            />

            <FormField
              autoComplete="password"
              className="mb-3"
              label="Password Confirmation"
              name="PasswordConfirmation"
              type="password"
              placeholder="Enter Your Password Again"
              value="password"
            />
            <div className="py-4 h-4 w-full flex items-center justify-center">
              {rejected ? (
                <h2 className="text-red-600 text-sm">{errorMessage}</h2>
              ) : null}
              {fulfilled ? (
                <h2 className="text-green-600 text-sm">Sign Up Successful</h2>
              ) : null}
            </div>
            <div className="flex justify-between items-center mt-5">
              {pending ? (
                <button
                  className="flex items-center justify-center bg-primaryColor py-3 px-3 md:px-7 rounded text-white ml-2 text-xs md:text-sm"
                  type="submit"
                >
                  <FaSpinner className="mr-3 animate-spin" />
                  Signing Up
                </button>
              ) : (
                <button
                  className="bg-primaryColor py-3 px-7 rounded text-white ml-2 text-xs md:text-sm hover:text-primaryColor hover:bg-white"
                  type="submit"
                >
                  Sign Up
                </button>
              )}
              <div className="flex flex-col text-xs md:text-sm">
                <span>Already have an account?</span>
                <button
                  className="mt-1"
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setSignIn(true);
                  }}
                >
                  Sign In
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SignUp;
