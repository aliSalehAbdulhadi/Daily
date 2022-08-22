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
import { reArrangeFirebase } from '../../../redux/slices/features/reArrangeTodos';

const formSchema = Yup.object().shape({
  Form: Yup.string().max(60, 'Too Long!'),
});
const TaskForm = () => {
  const [submitAnimation, setSubmitAnimation] = useState<boolean>(false);
  const [checkInternet, setCheckInternet] = useState<boolean>(true);
  const [uploadData, setUploadData] = useState<boolean>(false);

  const [iconValue, setIconValue] = useState<string>('');
  const todos: SingleTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);

  useEffect((): void => {
    window.ononline = () => {
      setCheckInternet(true);
      dispatch(reArrangeFirebase({ userUid: user, allTodos: todos }));
      setUploadData(true);

      setTimeout(() => {
        setUploadData(false);
      }, 5000);
    };

    window.onoffline = () => {
      setCheckInternet(false);
    };
  }, [dispatch, todos, user]);

  const disconnectHandler = () => {
    return !checkInternet ? (
      <div className="flex  mt-5 md:mt-0 justify-center items-center transition-all ease-in-out">
        <MdWifiOff
          type="button"
          className="cursor-pointer scale-[1.8] md:scale-[2] transition-all ease-in-out fill-red-600 animate-pulse"
        />
        <h1 className="text-red-300 ml-5 text-xs">
          Check your connection! <br /> Newly added tasks might not be saved.
        </h1>
      </div>
    ) : uploadData ? (
      <div className="flex items-center justify-center text-sm">
        Uploading data
        <div className="ml-1 scale-50">
          <ClapSpinner />
        </div>
      </div>
    ) : null;
  };

  return (
    <Formik
      initialValues={{ Form: '' }}
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
                    icon: iconValue.length === 0 ? 'personal' : iconValue,
                    date: newDate.toISOString(),
                    milestones: [],
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
          className={`${dark ? 'bg-primaryColor' : 'bg-primaryLight'} ${
            dark ? 'text-textDark' : 'text-textLight'
          } flex items-center justify-center select-none`}
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
                    dark ? 'bg-primaryColor' : 'bg-primaryLight'
                  } py-4 px-4 rounded outline-none w-[70%] md:w-[30%] md:text-base text-xs`}
                  classNameField={`my-1  p-5 outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded py-3  mt-3 font-Comfortaa ${
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
                  } scale-[1.6] mt-6 md:mt-1 md:pt-[1rem] rounded-br-md `}
                >
                  <BsPlusCircleDotted
                    className={` hover:rotate-[360deg] transition-all ease-in-out duration-500 ${
                      submitAnimation ? 'rotate-[360deg]' : ''
                    }`}
                  />
                </button>
              </div>

              {disconnectHandler()}
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
