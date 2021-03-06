import * as Yup from "yup";
import { Formik, Form } from "formik";
import { FaSpinner } from "react-icons/fa";
import Modal from "../Modal/Modal";
import {
  SignInInterface,
  useAppDispatch,
  useAppSelector,
} from "../../../interfaces/interfaces";
import FormField from "../../FormField/FormField";
import { signInThunk } from "../../../redux/slices/authentication/signInSlice";
import useCheckStatus from "../../../hooks/useCheckStatus";

const signInSchema = Yup.object().shape({
  Email: Yup.string().min(3).max(24).required(),
  Password: Yup.string().min(6).required(),
});

const SignIn = ({
  open,
  setOpen,
  setSignUp,
  setResetPassword,
}: SignInInterface) => {
  const dispatch = useAppDispatch();
  const signInError = useAppSelector(
    (state: any) => state.signInReducer?.error?.payload?.message,
  );
  const signInStatus = useAppSelector(
    (state: any) => state.signInReducer?.state,
  );
  const [pending, fulfilled, rejected, errorMessage] = useCheckStatus({
    setOpen,
    status: signInStatus,
    error: signInError,
  });

  return (
    <Modal label="Sign In" setOpen={setOpen} open={open}>
      <Formik
        initialValues={{ Email: "", Password: "" }}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          dispatch(
            signInThunk({ email: values.Email, password: values.Password }),
          );
        }}
      >
        {({}) => (
          <Form className="flex flex-col min-w-[35vh]">
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
              className="pt-5"
              label="Password"
              name="Password"
              type="password"
              placeholder="Enter Your Password"
              value="password"
            />
            <button
              type="button"
              onClick={() => {
                setResetPassword(true);
                setOpen(false);
              }}
              className="text-xs self-end mr-1 mt-1 transition-all duration-300 ease-in-out hover:translate-x-[-2px]"
            >
              Forgot Password?
            </button>
            <div className="py-4 h-4 w-full flex items-center justify-center">
              {rejected ? (
                <h2 className="text-red-600 text-sm">{errorMessage}</h2>
              ) : null}
              {fulfilled ? (
                <h2 className="text-green-600 text-sm">Login successful</h2>
              ) : null}
            </div>
            <div className="flex justify-between items-center mt-7">
              {pending ? (
                <button
                  className="flex items-center justify-center bg-primaryColor py-3 px-5 md:px-7 rounded text-white ml-2 text-xs md:text-sm"
                  type="submit"
                >
                  <FaSpinner className="mr-4 animate-spin" />
                  Signing In
                </button>
              ) : (
                <button
                  className="bg-primaryColor py-3 px-7 rounded text-white ml-2 text-xs md:text-sm hover:text-primaryColor hover:bg-white"
                  type="submit"
                >
                  Sign In
                </button>
              )}
              <div className="flex flex-col text-xs md:text-sm ">
                <span>Dont have an account?</span>
                <button
                  className="mt-1 transition-all duration-300 ease-in-out hover:translate-y-[2px]"
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
