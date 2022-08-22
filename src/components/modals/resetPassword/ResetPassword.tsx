import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FaSpinner } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../../interfaces/interfaces';
import FormField from '../../FormField/FormField';
import useCheckStatus from '../../../hooks/useCheckStatus';
import { resetPasswordThunk } from '../../../redux/slices/authentication/resetPasswordSlice';

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

  return (
    <Modal label="Reset Password" setOpen={setOpen} open={open}>
      <Formik
        initialValues={{ Email: '' }}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          dispatch(resetPasswordThunk({ email: values.Email }));
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
              classNameField="p-5 outline-none block w-full mt-1 shadow-sm sm:text-sm border-gray-300 rounded py-3 font-Comfortaa text-textLight"
            />

            <div className="py-2 h-4 w-full flex items-center justify-center">
              {rejected ? (
                <h2 className="text-red-600 text-sm">{errorMessage}</h2>
              ) : null}
              {fulfilled ? (
                <h2 className="text-green-600 text-sm">
                  Email sent successfully
                </h2>
              ) : null}
            </div>
            <div className="flex justify-center items-center mt-7">
              {pending ? (
                <button
                  className="flex items-center justify-center bg-primaryColor py-3 px-5 md:px-5 rounded text-white  text-xs md:text-sm"
                  type="submit"
                >
                  <FaSpinner className="mr-4 animate-spin" />
                  Submitting
                </button>
              ) : (
                <button
                  className="bg-primaryColor py-3 px-[4rem] rounded text-white  text-xs md:text-sm hover:text-primaryColor hover:bg-white"
                  type="submit"
                >
                  Submit
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ResetPassword;
