import { useState } from 'react';
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
import { changeUserName } from '../../../redux/slices/features/changeUserName';

const signInSchema = Yup.object().shape({
  username: Yup.string().min(0).max(15).required(),
});

const ChangeUserName = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [animation, setAnimation] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.userReducer.userUid);

  return (
    <Modal label="Change User Name" setOpen={setOpen} open={open}>
      <Formik
        initialValues={{ username: '' }}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          if (values.username.length <= 0) return;
          dispatch(
            changeUserName({ newUserName: values.username, userUid: user }),
          );
          setAnimation(true);
          setTimeout(() => {
            location.reload();
            setOpen(false);
            setAnimation(false);
          }, 1000);
        }}
      >
        {({}) => (
          <Form className="">
            <FormField
              autoComplete="userName"
              className="mb-3"
              label=""
              name="username"
              type="userName"
              placeholder="Enter new username"
              value="userName"
              classNameField="p-5 outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded py-3 font-Comfortaa text-textLight"
            />

            <div className="flex justify-center items-center mt-7 px-[5rem] py-5">
              {animation ? (
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

export default ChangeUserName;
