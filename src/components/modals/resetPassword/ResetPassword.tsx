import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FaSpinner } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../../interfaces/interfaces';
import FormField from '../../FormField/FormField';
import useCheckStatus from '../../../hooks/useCheckStatus';
import { resetPasswordThunk } from '../../../redux/slices/authentication/resetPasswordSlice';
import { isOnline } from '../../../utilities/isOnline';
import { Dark } from '../../../utilities/globalImports';
import ModalNoConnectionError from '../../modalNoConnectionError/ModalNoConnectionError';

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
  const dark = Dark();

  return (
    <Modal label="Reset Password" setOpen={setOpen} open={open}>
      <Formik
        initialValues={{ Email: '' }}
        validationSchema={signInSchema}
        onSubmit={(values, { resetForm }) => {
          if (isOnline()) {
            dispatch(resetPasswordThunk({ email: values.Email }));
          }
          resetForm();
        }}
      >
        {({}) => (
          <Form>
            <FormField
              autoComplete="email"
              className={`mb-10 mt-5 h-10 ${isOnline() ? '' : 'hidden '}`}
              label="Enter your account email."
              name="Email"
              type="email"
              placeholder="You@email.com"
              value="email"
              classNameField="p-3 outline-none block w-full mt-1 shadow-sm sm:text-sm border-gray-300 rounded py-3 mb-1 font-Comfortaa text-textLight text-xs xs:text-sm semiSm:text-base"
            />
            {isOnline() ? (
              <div className={`${isOnline() ? '' : ''} px-[5rem] py-5`}>
                <div className="w-[11rem] h-5 flex items-center justify-center ">
                  {rejected ? (
                    <h2 className="text-red-600 text-sm">{errorMessage}</h2>
                  ) : null}
                  {fulfilled ? (
                    <h2 className="text-green-600 text-sm ">
                      Email sent successfully
                    </h2>
                  ) : null}
                </div>
                <div className="flex justify-center items-center ">
                  {pending ? (
                    <button
                      title="Sending"
                      className={`flex items-center justify-center  relative ${
                        dark ? 'bg-primaryColor' : 'bg-secondaryLight'
                      } py-3 px-[2.45rem] rounded text-white  text-sm md:text-sm`}
                      type="submit"
                    >
                      <span className="mr-5">Resetting</span>
                      <FaSpinner className="animate-spin absolute right-7" />
                    </button>
                  ) : (
                    <button
                      title="Send"
                      className={`${
                        dark ? 'bg-primaryColor' : 'bg-secondaryLight'
                      } py-3 px-[4rem]  rounded text-white  text-sm md:text-sm hover:text-primaryColor hover:bg-white`}
                      type="submit"
                    >
                      Send
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center mt-5">
                <ModalNoConnectionError errorType="to change your password." />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ResetPassword;
