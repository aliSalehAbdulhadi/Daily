import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Modal from "./../Modal/Modal";
import { SignUpInterface } from "../../../interfaces/interfaces";
import FormField from "../../FormField/FormField";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
} from "../../../interfaces/interfaces";
import { signUpThunk } from "../../../redux/slices/authentication/signUpSlice";
import { addUsername } from "../../../redux/slices/features/addUsername";

const signUpSchema = Yup.object().shape({
  UserName: Yup.string().min(3).max(24).required("User name is required"),
  Email: Yup.string().min(3).max(24).required("Email is required"),
  Password: Yup.string().min(6).required("Password is required"),
  PasswordConfirmation: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref("Password"), null], "Password must match"),
});

const SignUp = ({ open, setOpen, setSignIn }: SignUpInterface) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);

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
        onSubmit={(values, { resetForm }) => {
          dispatch(
            signUpThunk({ email: values.Email, password: values.Password }),
          );
          setTimeout(() => {
            dispatch(
              addUsername({
                userName: values.UserName,
                userUid: user,
              }),
            );
          });
          setOpen(false);
          resetForm();
        }}
      >
        {({}) => (
          <Form>
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
            <div className="flex justify-between items-center mt-5">
              <button
                className="bg-primaryColor py-3 px-7 rounded-tl-md rounded-br-md text-white"
                type="submit"
              >
                Sign Up
              </button>
              <div className="flex flex-col text-sm">
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
