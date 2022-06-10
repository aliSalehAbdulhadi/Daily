import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { FaSpinner } from "react-icons/fa";
import Modal from "../Modal/Modal";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../interfaces/interfaces";
import FormField from "../../FormField/FormField";
import { changeUserName } from "../../../redux/slices/features/changeUserName";

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
        initialValues={{ username: "" }}
        validationSchema={signInSchema}
        onSubmit={(values) => {
          if (values.username.length <= 0) return;
          dispatch(
            changeUserName({ newUserName: values.username, userUid: user }),
          );
          setAnimation(true);
          setTimeout(() => {
            setOpen(false);
            setAnimation(false);
          }, 1000);
        }}
      >
        {({}) => (
          <Form>
            <FormField
              autoComplete="userName"
              className="mb-3"
              label=""
              name="username"
              type="userName"
              placeholder="Enter user name"
              value="userName"
            />

            <div className="py-4 h-4 w-full flex items-center justify-center">
              <h1 className="text-sm">
                After submitting, refresh to see the changes.
              </h1>
            </div>
            <div className="flex justify-center items-center mt-7">
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
