import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { MdWifiOff } from 'react-icons/md';
import { ClapSpinner } from 'react-spinners-kit';
import FormField from '../../FormField/FormField';
import { addTodo } from '../../../redux/slices/features/addTodoSlice';
import { setTodos } from '../../../redux/slices/features/getTodoSlice';
import {
  RootState,
  SingleTodoInterface,
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
                  icon: iconValue.length === 0 ? 'personal' : iconValue,
                  date: newDate.toISOString(),
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
                  icon: iconValue.length === 0 ? 'personal' : iconValue,
                  date: newDate.toISOString(),
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
          className={`${
            dark ? 'bg-primaryColor' : 'bg-primaryLight'
          } w-full  px-10 pt-3 ${
            dark ? 'text-textDark' : 'text-textLight'
          } flex items-center justify-center select-none h-fit`}
        >
          {user ? (
            <div className="w-full   flex flex-col mb-5 sm:mb-0 ml-7">
              <div className="flex items-center justify-center  w-full relative">
                <div className="absolute top-7 left-[-115px]">
                  <DropDownMenu iconValue={(e: string) => setIconValue(e)} />
                </div>
                <FormField
                  type="text"
                  // label="What are you up to today?"
                  label=""
                  name="Form"
                  value="form"
                  autoComplete="form"
                  placeholder="Enter Your Task"
                  className={`${
                    dark ? 'bg-primaryColor' : 'bg-primaryLight'
                  } rounded outline-none w-full md:text-base text-xs mr-5`}
                  classNameField={`my-1  p-5 outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded py-3  mt-3 font-Comfortaa w-full  ${
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
              <h1 className="text-sm self-start ml-1 font-Comfortaa">
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
