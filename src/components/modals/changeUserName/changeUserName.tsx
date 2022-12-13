import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FaSpinner } from 'react-icons/fa';
import Modal from '../Modal/Modal';
import { useAppDispatch } from '../../../interfaces/interfaces';
import FormField from '../../FormField/FormField';
import { changeUserName } from '../../../redux/slices/features/fireBaseActions/changeUserNameSlice';
import { isOnline } from '../../../utilities/isOnline';
import { Dark, UserKey } from '../../../utilities/globalImports';
import ModalNoConnectionError from '../../modalNoConnectionError/ModalNoConnectionError';

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
  const user = UserKey();

  const dark = Dark();

  return (
    <Modal label="Change Username" setOpen={setOpen} open={open}>
      <Formik
        initialValues={{ username: '' }}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          if (isOnline()) {
            if (values.username?.length <= 0) return;
            dispatch(
              changeUserName({ newUserName: values.username, userUid: user }),
            );
            setAnimation(true);
            setTimeout(() => {
              location.reload();
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
              label="Enter new username"
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
                    title="Changing"
                    className={`flex items-center justify-center relative ${
                      dark ? 'bg-primaryColor' : 'bg-secondaryLight'
                    } py-3 px-[2.95rem] rounded text-white  text-xs md:text-sm`}
                    type="submit"
                  >
                    <span className="mr-5">Changing</span>
                    <FaSpinner className=" animate-spin absolute right-5" />
                  </button>
                ) : (
                  <button
                    title="Change"
                    className={`${
                      dark ? 'bg-primaryColor' : 'bg-secondaryLight'
                    } py-3 px-[4rem] rounded text-white  text-xs md:text-sm hover:text-primaryColor hover:bg-white`}
                    type="submit"
                  >
                    Change
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

export default ChangeUserName;
