import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FaSpinner } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import { useAppDispatch } from '../../../interfaces/interfaces';
import FormField from '../../FormField/FormField';
import { isOnline } from '../../../utilities/isOnline';
import { Dark, UserKey } from '../../../utilities/globalImports';
import ModalNoConnectionError from '../../modalNoConnectionError/ModalNoConnectionError';
import { addUsername } from '../../../redux/slices/features/fireBaseActions/addUsernameSlice';
import {
  changeUsernameLocally,
  getTasks,
} from '../../../redux/slices/features/getTasksSlice';

const signInSchema = Yup.object().shape({
  username: Yup.string().min(0).max(15).required(),
});

const SetUserName = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [animation, setAnimation] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = UserKey();
  const dark = Dark();

  return (
    <Modal
      label="Enter Username"
      setOpen={setOpen}
      open={open}
      closeable={false}
    >
      <Formik
        initialValues={{ username: '' }}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          if (isOnline()) {
            if (values.username?.length <= 0) return;
            dispatch(addUsername({ userName: values.username, userUid: user }));
            setAnimation(true);
            setTimeout(() => {
              dispatch(changeUsernameLocally(values.username));
              dispatch(getTasks({ userUid: user }));
              setOpen(false);
              setAnimation(false);
            }, 1000);
          }
        }}
      >
        {({}) => (
          <Form>
            <FormField
              autoComplete=""
              className={`mb-10 mt-5 h-10 ${isOnline() ? '' : 'hidden '}`}
              label=""
              name="username"
              type="userName"
              placeholder="Enter new username"
              value="userName"
              classNameField="p-3 outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded py-3 mb-1 font-Comfortaa text-textLight text-xs xs:text-sm semiSm:text-base"
            />

            {isOnline() ? (
              <div className="flex justify-center items-center px-[4.5rem] py-5">
                {animation ? (
                  <button
                    title="Submitting"
                    className={`flex items-center justify-center relative ${
                      dark ? 'bg-primaryColor' : 'bg-secondaryLight'
                    } py-3 px-[2.6rem] rounded text-white  text-xs`}
                    type="submit"
                  >
                    <span className="mr-5">Submitting</span>
                    <FaSpinner className=" animate-spin absolute right-5" />
                  </button>
                ) : (
                  <button
                    title="Submit"
                    className={`${
                      dark ? 'bg-primaryColor' : 'bg-secondaryLight'
                    } py-3 px-[4rem] rounded text-white  text-xs hover:text-primaryColor hover:bg-white`}
                    type="submit"
                  >
                    Submit
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center mt-5">
                <ModalNoConnectionError errorType="to change your username." />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SetUserName;
