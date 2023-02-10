import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FaSpinner } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import {
  SignInInterface,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import { signInThunk } from '../../../redux/slices/authentication/signInSlice';
import useCheckStatus from '../../../hooks/useCheckStatus';
import { isOnline } from '../../../utilities/isOnline';
import { Dark } from '../../../utilities/globalImports';
import GoogleButton from '../../googleButton/GoogleButton';
import { signInWithGoogle } from '../../../redux/slices/authentication/signInWithGoogleSlice';
import useWindowSize from '../../../hooks/useWindowsSize';
import FormField from '../../Forms/FormField/FormField';

const signInSchema = Yup.object().shape({
  Email: Yup.string().required(),
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

  const dark = Dark();
  const vw = useWindowSize();

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
          <Form className="flex flex-col ">
            <FormField
              autoComplete="email"
              className="mb-3"
              label="Email"
              name="Email"
              type="email"
              placeholder="Enter Your Email"
              value="email"
              classNameField="p-5 outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded py-2 xs:py-3 font-Comfortaa text-textLight mt-1"
            />
            <FormField
              autoComplete=""
              className="pt-5"
              label="Password"
              name="Password"
              type="password"
              placeholder="Enter Your Password"
              value="password"
              classNameField="p-5 outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded py-2 xs:py-3 font-Comfortaa text-textLight mt-1 "
            />
            <button
              title="Forgot Password"
              type="button"
              onClick={() => {
                setResetPassword(true);
                setOpen(false);
              }}
              className="text-sm self-center  mt-7"
            >
              Forgot Password?
            </button>

            <div
              onClick={() =>
                dispatch(signInWithGoogle({ isMobile: vw <= 840 }))
              }
              className="flex items-center justify-center mt-5"
            >
              <GoogleButton />
            </div>

            <div className="mt-3 h-4 w-full flex items-center justify-center">
              {rejected ? (
                <h2 className="text-red-600 text-sm">{errorMessage}</h2>
              ) : null}
              {fulfilled ? (
                <h2 className="text-green-600 text-sm">Login successful</h2>
              ) : null}
            </div>
            <div className="flex justify-between items-center mt-3">
              {pending ? (
                <button
                  title="Signing In"
                  className={`flex items-center justify-center py-3 px-[8.2px] rounded text-white whitespace-nowrap  text-xs  ${
                    dark ? 'bg-primaryColor' : 'bg-secondaryLight'
                  }`}
                  type="submit"
                >
                  Signing In
                  <FaSpinner className=" ml-2 animate-spin" />
                </button>
              ) : (
                <button
                  title="Sign In"
                  className={`  py-3 px-7 whitespace-nowrap  rounded text-white text-xs  hover:text-primaryColor hover:bg-white ${
                    dark ? 'bg-primaryColor' : 'bg-secondaryLight'
                  }`}
                  type="submit"
                >
                  Sign In
                </button>
              )}
              <div className="flex flex-col items-center justify-center text-xs mr-5 xs:mr-0 xs:ml-4 whitespace-nowrap">
                <span className="hidden xs:block">Dont have an account?</span>
                <button
                  title="Sign Up"
                  className="xs:mt-1 underline underline-offset-[5px]"
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
