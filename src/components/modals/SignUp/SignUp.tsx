import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FaSpinner } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import { SignUpInterface } from '../../../interfaces/interfaces';
import {
  useAppDispatch,
  useAppSelector,
  RootState,
} from '../../../interfaces/interfaces';
import { signUpThunk } from '../../../redux/slices/authentication/signUpSlice';
import { addUsername } from '../../../redux/slices/features/fireBaseActions/addUsernameSlice';
import useCheckStatus from '../../../hooks/useCheckStatus';
import { isOnline } from '../../../utilities/isOnline';
import { Dark, UserKey } from '../../../utilities/globalImports';
import GoogleButton from '../../googleButton/GoogleButton';
import { signInWithGoogle } from '../../../redux/slices/authentication/signInWithGoogleSlice';
import useWindowSize from '../../../hooks/useWindowsSize';
import FormField from '../../Forms/FormField/FormField';

const signUpSchema = Yup.object().shape({
  UserName: Yup.string().min(3).max(15).required('User name is required'),
  Email: Yup.string().required('Email is required'),
  Password: Yup.string().min(6).required('Password is required'),
  PasswordConfirmation: Yup.string()
    .required('Password is required')
    .oneOf([Yup.ref('Password'), null], 'Password must match'),
});

const SignUp = ({ open, setOpen, setSignIn }: SignUpInterface) => {
  const dispatch = useAppDispatch();
  const user = UserKey();

  const signInError = useAppSelector(
    (state: any) => state.signInReducer?.error?.payload?.message,
  );
  const signUpStatus = useAppSelector(
    (state: any) => state.signUpReducer?.state,
  );
  const dark = Dark();
  const [pending, fulfilled, rejected, errorMessage] = useCheckStatus({
    setOpen,
    status: signUpStatus,
    error: signInError,
  });

  const userName = useAppSelector(
    (state: RootState) => state.getTaskReducer.userName,
  );

  const [fullName, setFullName] = useState<string>(userName);
  const [submit, setSubmit] = useState<boolean>(false);
  useEffect(() => {
    if (submit && isOnline()) {
      dispatch(
        addUsername({
          userName: fullName,
          userUid: user,
        }),
      );
    }
  }, [user, dispatch, fullName, submit]);

  const vw = useWindowSize();

  return (
    <Modal label="Sign Up" setOpen={setOpen} open={open}>
      <Formik
        initialValues={{
          UserName: '',
          Email: '',
          Password: '',
          PasswordConfirmation: '',
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
          <Form className="">
            <FormField
              autoComplete="username"
              className="mb-3 placeholder-text-sm"
              label="Username"
              name="UserName"
              type="text"
              placeholder="Enter Your Username"
              value="username"
              classNameField="p-5 outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded py-2 xs:py-3 font-Comfortaa text-textLight mt-1"
            />
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
              className="mb-3"
              label="Password"
              name="Password"
              type="password"
              placeholder="Enter Your Password"
              value="password"
              classNameField="p-5 outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded py-2 xs:py-3 font-Comfortaa text-textLight mt-1"
            />

            <FormField
              autoComplete=""
              className="mb-3"
              label="Re-write password"
              name="PasswordConfirmation"
              type="password"
              placeholder="Enter Your Password Again"
              value="password"
              classNameField="p-5 outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded py-2 xs:py-3 font-Comfortaa text-textLight mt-1"
            />

            <div
              onClick={() =>
                dispatch(signInWithGoogle({ isMobile: vw <= 840 }))
              }
              className="flex items-center justify-center mt-5"
            >
              <GoogleButton />
            </div>

            <div className="mt-4 h-4 w-full flex items-center justify-center">
              {rejected ? (
                <h2 className="text-red-600 text-sm">{errorMessage}</h2>
              ) : null}
              {fulfilled ? (
                <h2 className="text-green-600 text-sm">Sign Up Successful</h2>
              ) : null}
            </div>
            <div className="flex justify-between items-center mt-3">
              {pending ? (
                <button
                  title="Signing Up"
                  className={`flex items-center justify-center py-3 px-2 rounded text-white whitespace-nowrap  text-xs  ${
                    dark ? 'bg-primaryColor' : 'bg-secondaryLight'
                  } `}
                  type="submit"
                >
                  Signing Up
                  <FaSpinner className="ml-2 animate-spin" />
                </button>
              ) : (
                <button
                  title="Sign Up"
                  className={`py-3 px-7 rounded whitespace-nowrap  text-white text-xs  hover:text-primaryColor hover:bg-white ${
                    dark ? 'bg-primaryColor' : 'bg-secondaryLight'
                  }`}
                  type="submit"
                >
                  Sign Up
                </button>
              )}
              <div className="flex flex-col items-center justify-center text-xs mr-5 xs:mr-0 xs:ml-4 whitespace-nowrap">
                <span className="hidden xs:block">
                  Already have an account?
                </span>
                <button
                  title="Sign In"
                  className="xs:mt-1 underline underline-offset-[5px]"
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
