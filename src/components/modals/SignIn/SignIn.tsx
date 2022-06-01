import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import Modal from "../Modal/Modal";
import {
  SignInInterface,
  useAppDispatch,
  useAppSelector,
} from "../../../interfaces/interfaces";
import FormField from "../../FormField/FormField";
import { signInThunk } from "../../../redux/slices/authentication/signInSlice";

const signInSchema = Yup.object().shape({
  Email: Yup.string().min(3).max(24).required(),
  Password: Yup.string().min(6).required(),
});

const SignIn = ({ open, setOpen, setSignUp }: SignInInterface) => {
  const dispatch = useAppDispatch();
  const signIn = useAppSelector((state: any) => state.signInReducer);

  return (
    <Modal label="Sign In" setOpen={setOpen} open={open}>
      <Formik
        initialValues={{ Email: "", Password: "" }}
        validationSchema={signInSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(
            signInThunk({ email: values.Email, password: values.Password }),
          );
          resetForm();
          setOpen(false);
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
            <div className="flex justify-between items-center">
              <button
                className="bg-primaryColor py-3 px-7 rounded-tl-md rounded-br-md text-white ml-2"
                type="submit"
              >
                Sign In
              </button>
              <div className="flex flex-col text-sm">
                <span>Dont have an account?</span>
                <button
                  className="mt-1"
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setSignUp(true);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SignIn;
