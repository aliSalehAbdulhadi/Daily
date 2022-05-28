import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormField from "./FormField";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/features/addTaskSlice";
import { RootState } from "../interfaces/interfaces";

const formSchema = Yup.object().shape({
  Form: Yup.string(),
});
const TaskForm = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.addTaskReducer.tasks);
  console.log(tasks);
  return (
    <Formik
      initialValues={{ Form: "" }}
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(addTask({ task: values.Form, id: tasks.length + 1 }));
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
