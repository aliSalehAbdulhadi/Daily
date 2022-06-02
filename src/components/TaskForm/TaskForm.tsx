import * as Yup from "yup";
import { Formik, Form } from "formik";
import { v4 as uuidv4 } from "uuid";
import { BsPlusCircleDotted } from "react-icons/bs";
import { useState } from "react";
import FormField from "../FormField/FormField";
import { addTodo } from "../../redux/slices/features/addTodoSlice";
import { setTodos } from "../../redux/slices/features/getTodoSlice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../interfaces/interfaces";
import DropDownMenu from "../SingleTask/DropDownMenu";

const formSchema = Yup.object().shape({
  Form: Yup.string(),
});
const TaskForm = () => {
  const [submitAnimation, setSubmitAnimation] = useState<boolean>(false);
  const [iconValue, setIconValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);

  return (
    <Formik
      initialValues={{ Form: "" }}
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        values.Form.length === 0
          ? false
          : dispatch(
              addTodo({
                todo: {
                  content: values.Form,
                  completed: false,
                  id: uuidv4(),
                  icon: iconValue.length === 0 ? "personal" : iconValue,
                },
                userUid: user,
              }),
            );

        values.Form.length === 0
          ? false
          : setTimeout(() => {
              dispatch(
                setTodos({
                  content: values.Form,
                  completed: false,
                  id: uuidv4(),
                  icon: iconValue.length === 0 ? "personal" : iconValue,
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
        <Form className="bg-primaryColor flex items-center justify-center text-white">
          {user ? (
            <div className="w-full flex items-center justify-center pr-[3rem] mr-6 md:mr-10">
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
                className=" bg-primaryColor py-4 px-4 rounded-tl-md outline-none w-[70%] md:w-[30%] md:text-base text-xs"
              />

              <button
                type="submit"
                className="scale-[1.6] mt-6 md:mt-1 md:pt-[1rem] text-white rounded-br-md"
              >
                <BsPlusCircleDotted
                  className={`hover:rotate-[360deg] transition-all ease-in-out duration-500 ${
                    submitAnimation ? "rotate-[360deg]" : ""
                  }`}
                />
              </button>
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
