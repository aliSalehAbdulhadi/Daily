import React from "react";
import * as Yup from "yup";
import Modal from "./Modal";
import { Formik, Form } from "formik";
import { SignUpInterface } from "../../interfaces/interfaces";
import FormField from "../FormField";
import { useAppDispatch, useAppSelector } from "../../interfaces/interfaces";
import { signUpThunk } from "../../redux/slices/authentication/signUpSlice";

const signUpSchema = Yup.object().shape({
  Email: Yup.string().min(3).max(24).required(),
  Password: Yup.string().min(6).required(),
  PasswordConfirmation: Yup.string().min(6).required(),
  UserName: Yup.string().min(3).max(24).required(),
});

const SignUp = ({ open, setOpen, setSignIn }: SignUpInterface) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: any) => state.signUpReducer);

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
          resetForm();
          setOpen(false);
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
            <button
              className="bg-primaryColor py-3 px-7 rounded-tl-md rounded-br-md text-white"
              type="submit"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => {
                setSignIn(true);
                setOpen(false);
              }}
            >
              Sign In
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SignUp;
