import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FaSpinner } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import FormField from '../../FormField/FormField';
import useCheckStatus from '../../../hooks/useCheckStatus';
import { resetPasswordThunk } from '../../../redux/slices/authentication/resetPasswordSlice';
import { isOnline } from '../../../utilities/isOnline';

const signInSchema = Yup.object().shape({
  Email: Yup.string().min(3).max(24).required(),
});

const ResetPassword = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const passwordError = useAppSelector(
    (state) => state.resetPasswordReducer?.error,
  );
  const passwordState = useAppSelector(
    (state) => state.resetPasswordReducer?.state,
  );

  const [pending, fulfilled, rejected, errorMessage] = useCheckStatus({
    setOpen,
    status: passwordState,
    error: passwordError,
  });
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );

  return (
    <Modal label="Reset Password" setOpen={setOpen} open={open}>
      <Formik
        initialValues={{ Email: '' }}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          if (isOnline()) {
            dispatch(resetPasswordThunk({ email: values.Email }));
          }
        }}
      >
        {({}) => (
          <Form>
            <FormField
              autoComplete="email"
              className="mb-3"
              label="Enter your account email."
              name="Email"
              type="email"
              placeholder="Enter Your Email"
              value="email"
              classNameField="p-5 outline-none block w-full mt-1 shadow-sm sm:text-sm border-gray-300 rounded py-3 font-Comfortaa text-textLight "
            />
            <div className={isOnline() ? '' : ''}>
              <div className="py-2 h-4 w-full flex items-center justify-center ">
                {rejected ? (
                  <h2 className="text-red-600 text-sm">{errorMessage}</h2>
                ) : null}
                {fulfilled ? (
                  <h2 className="text-green-600 text-sm">
                    Email sent successfully
                  </h2>
                ) : null}
              </div>
              {isOnline() ? (
                <div className="flex justify-center items-center mt-7">
                  {pending ? (
                    <button
                      className={`flex items-center justify-center  relative ${
                        dark ? 'bg-primaryColor' : 'bg-secondaryLight'
                      } py-3 w-[10rem] rounded text-white  text-sm md:text-sm`}
                      type="submit"
                    >
                      <span className='mr-5'>Resetting</span>
                      <FaSpinner className="animate-spin absolute right-7" />
                    </button>
                  ) : (
                    <button
                      className={`${
                        dark ? 'bg-primaryColor' : 'bg-secondaryLight'
                      } py-3  w-[10rem]  rounded text-white  text-sm md:text-sm hover:text-primaryColor hover:bg-white`}
                      type="submit"
                    >
                      Reset
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-sm">
                  You must be connected to change you password.
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ResetPassword;
