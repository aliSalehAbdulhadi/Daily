import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FaSpinner } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import {
  RootState,
  SignInInterface,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import FormField from '../../FormField/FormField';
import { signInThunk } from '../../../redux/slices/authentication/signInSlice';
import useCheckStatus from '../../../hooks/useCheckStatus';
import { isOnline } from '../../../utilities/isOnline';

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

  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );

  return (
    <Modal label="Sign In" setOpen={setOpen} open={open}>
      <Formik
        initialValues={{ Email: '', Password: '' }}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          if (isOnline()) {
            dispatch(
              signInThunk({ email: values.Email, password: values.Password }),
            );
          }
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
              classNameField="p-5 outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded py-3 font-Comfortaa text-textLight mt-1"
            />
            <FormField
              autoComplete=""
              className="pt-5"
              label="Password"
              name="Password"
              type="password"
              placeholder="Enter Your Password"
              value="password"
              classNameField="p-5 outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded py-3 font-Comfortaa text-textLight mt-1 "
            />
            <button
              type="button"
              onClick={() => {
                setResetPassword(true);
                setOpen(false);
              }}
              className="text-xs self-end mr-1 mt-1"
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
                  className={`flex items-center justify-center py-3 px-5 rounded text-white  text-xs md:text-sm ${
                    dark ? 'bg-primaryColor' : 'bg-secondaryLight'
                  }`}
                  type="submit"
                >
                  <FaSpinner className="mr-4 animate-spin" />
                  Signing In
                </button>
              ) : (
                <button
                  className={`py-3 px-7 rounded text-white text-xs md:text-sm hover:text-primaryColor hover:bg-white ${
                    dark ? 'bg-primaryColor' : 'bg-secondaryLight'
                  }`}
                  type="submit"
                >
                  Sign In
                </button>
              )}
              <div className="flex flex-col text-xs md:text-sm ">
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
