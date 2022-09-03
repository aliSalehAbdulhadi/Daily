import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { useState } from 'react';
import FormField from '../../FormField/FormField';
import { addTodo } from '../../../redux/slices/features/addTodoSlice';
import { setTodos } from '../../../redux/slices/features/getTodoSlice';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import DropDownMenu from './DropDownMenu';

const formSchema = Yup.object().shape({
  Form: Yup.string().max(60, 'Too Long!'),
});
const TaskForm = () => {
  const [submitAnimation, setSubmitAnimation] = useState<boolean>(false);

  const [iconValue, setIconValue] = useState<string>('');

  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);

  return (
    <Formik
      initialValues={{ Form: '' }}
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        const newDate = new Date();
        values.Form.length === 0
          ? false
          : dispatch(
              addTodo({
                todo: {
                  content: values.Form,
                  completed: false,
                  id: uuidv4(),
                  taskType: 'personal',
                  date: newDate.toISOString(),
                  important: false,
                  milestones: [],
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
                  taskType: 'personal',
                  date: newDate.toISOString(),
                  important: false,
                  milestones: [],
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
          className={` ${dark ? 'bg-primaryColor' : 'bg-primaryLight'} pt-3 ${
            dark ? 'text-textDark' : 'text-textLight'
          } flex items-center justify-center select-none h-fit`}
        >
          {user ? (
            <div className=" flex flex-col mb-5 sm:mb-0 ml-7 semiSm:ml-0 xl:w-[40%] md:w-[50%] w-[70%]">
              <div className="flex items-center justify-center  w-full">
                <FormField
                  type="text"
                  label=""
                  name="Form"
                  value="form"
                  autoComplete="form"
                  placeholder="Enter Your Task"
                  className={`${
                    dark ? 'bg-primaryColor' : 'bg-primaryLight'
                  } rounded outline-none md:text-base text-xs mr-5 w-full`}
                  classNameField={`my-1  p-5 outline-none block shadow-sm sm:text-sm border-gray-300 rounded py-3  mt-3 font-Comfortaa w-full ${
                    dark ? 'bg-textDark' : 'bg-secondaryLight'
                  } ${
                    dark ? 'text-textLight' : 'text-textDark'
                  } text-sm md:text-base ${dark ? '' : 'placeholder-textDark'}`}
                />

                <button
                  title="Submit"
                  type="submit"
                  className={`${
                    dark ? 'text-textDark' : 'text-textLight'
                  } scale-[1.6] mt-2 rounded-br-md `}
                >
                  <BsPlusCircleDotted
                    className={` hover:rotate-[360deg] transition-all ease-in-out duration-500 ${
                      submitAnimation ? 'rotate-[360deg]' : ''
                    }`}
                  />
                </button>
              </div>
              <h1 className="text-xs semiSm:text-sm self-start ml-1 font-Comfortaa">
                What are you up to today?
              </h1>
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
