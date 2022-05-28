import React from "react";
import * as Yup from "yup";
import Modal from "./Modal";
import { Formik, Form } from "formik";
import { SignInInterface } from "../../interfaces/interfaces";
import FormField from "../FormField";

const signInSchema = Yup.object().shape({
  Email: Yup.string().min(3).max(24).required(),
  Password: Yup.string().min(6).required(),
});

const SignIn = ({ open, setOpen, setSignUp }: SignInInterface) => {
  return (
    <Modal label="Sign In" setOpen={setOpen} open={open}>
      <Formik
        initialValues={{ Email: "", Password: "" }}
        validationSchema={signInSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values.Email, values.Password);
          resetForm()
        }}
      >
        {({}) => (
          <Form>
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
              className="mb-3 py-5"
              label="Password"
              name="Password"
              type="password"
              placeholder="Enter Your Password"
              value="password"
            />
            <button
              className="bg-primaryColor py-3 px-7 rounded-tl-md rounded-br-md text-white"
              type="submit"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSignUp(true);
              }}
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SignIn;
