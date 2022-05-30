import * as Yup from "yup";
import { Formik, Form } from "formik";
import { v4 as uuidv4 } from "uuid";
import FormField from "./FormField";
import { addTodo } from "../redux/slices/features/addTodoSlice";
import { getTodo } from "../redux/slices/features/getTodoSlice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../interfaces/interfaces";

const formSchema = Yup.object().shape({
  Form: Yup.string(),
});
const TaskForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const addTodoError = useAppSelector(
    (state: RootState) => state.addTodoReducer,
  );
  return (
    <Formik
      initialValues={{ Form: "" }}
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(
          addTodo({
            todo: { content: values.Form, completed: false, id: uuidv4() },
            userUid: user,
          }),
        );
        setTimeout(() => {
          dispatch(getTodo({ userUid: user }));
        }, 500);

        resetForm();
      }}
    >
      {({}) => (
        <Form className="bg-primaryColor flex items-center justify-center ">
          <FormField
            type="text"
            label="What are you up to today?"
            name="Form"
            value="form"
            autoComplete="form"
            placeholder="Enter Your Task"
            className=" bg-secondaryColor py-4 px-4 rounded-tl-md outline-none w-[70%] md:w-[30%]"
          />
          <button
            type="submit"
            className="p-9  bg-secondaryColor rounded-br-md"
          >
            Add
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
