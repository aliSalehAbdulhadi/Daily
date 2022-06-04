/* eslint-disable react-hooks/rules-of-hooks */
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { v4 as uuidv4 } from "uuid";
import { BsPlusCircleDotted } from "react-icons/bs";
import { useEffect, useState } from "react";
import FormField from "../FormField/FormField";
import { addTodo } from "../../redux/slices/features/addTodoSlice";
import { setTodos } from "../../redux/slices/features/getTodoSlice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../interfaces/interfaces";
import DropDownMenu from "../SingleTask/DropDownMenu";
import { MdWifiOff } from "react-icons/md";

const formSchema = Yup.object().shape({
  Form: Yup.string(),
});
const TaskForm = () => {
  const [submitAnimation, setSubmitAnimation] = useState<boolean>(false);
  const [checkInternet, setCheckInternet] = useState<boolean>(true);
  const [iconValue, setIconValue] = useState<string>("");
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);

  useEffect((): void => {
    window.ononline = () => {
      setCheckInternet(true);
    };

    window.onoffline = () => {
      setCheckInternet(false);
    };
  }, []);

  return (
    <Formik
      initialValues={{ Form: "" }}
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        const newDate = new Date();
        checkInternet
          ? values.Form.length === 0
            ? false
            : dispatch(
                addTodo({
                  todo: {
                    content: values.Form,
                    completed: false,
                    id: uuidv4(),
                    icon: iconValue.length === 0 ? "personal" : iconValue,
                    date: newDate.toLocaleString(),
                  },
                  userUid: user,
                }),
              )
          : null;

        values.Form.length === 0
          ? false
          : setTimeout(() => {
              dispatch(
                setTodos({
                  content: values.Form,
                  completed: false,
                  id: uuidv4(),
                  icon: iconValue.length === 0 ? "personal" : iconValue,
                  date: newDate.toLocaleDateString(),
                }),
              );
            }, 200);

        setSubmitAnimation(true);
        setTimeout(() => {
          setSubmitAnimation(false);
        }, 1000);

        resetForm();
      }}
    >
      {({}) => (
        <Form
          className={`${dark ? "bg-primaryColor" : "bg-primaryLight"} ${
            dark ? "text-textDark" : "text-textLight"
          } flex items-center justify-center`}
        >
          {user ? (
            <div className="w-full pb-10 md:pb-0">
              <div className="flex items-center justify-center pr-[3rem] mr-7 md:mr-10">
                <div className="mt-7 md:mt-8 ">
                  <DropDownMenu iconValue={(e: string) => setIconValue(e)} />
                </div>
                <FormField
                  type="text"
                  label="What are you up to today?"
                  name="Form"
                  value="form"
                  autoComplete="form"
                  placeholder="Enter Your Task"
                  className={`${
                    dark ? "bg-primaryColor" : "bg-primaryLight"
                  } py-4 px-4 rounded-tl-md outline-none w-[70%] md:w-[30%] md:text-base text-xs`}
                />

                <button
                  type="submit"
                  className={`${
                    dark ? "text-textDark" : "text-textLight"
                  } scale-[1.6] mt-6 md:mt-1 md:pt-[1rem] rounded-br-md `}
                >
                  <BsPlusCircleDotted
                    className={` hover:rotate-[360deg] transition-all ease-in-out duration-500 ${
                      submitAnimation ? "rotate-[360deg]" : ""
                    }`}
                  />
                </button>
              </div>

              {!checkInternet ? (
                <div className="flex  mt-5 md:mt-0 justify-center items-center transition-all ease-in-out">
                  <MdWifiOff
                    type="button"
                    className="cursor-pointer scale-[1.8] md:scale-[2] transition-all ease-in-out fill-red-600 animate-pulse"
                  />
                  <h1 className="text-red-300 ml-5 text-xs">
                    Check your connection! <br /> Newly added tasks might not be
                    saved.
                  </h1>
                </div>
              ) : null}
            </div>
          ) : (
            <h1 className="bg-secondaryColor py-4 px-10 rounded-md text-white">
              Please login to add new tasks.
            </h1>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
