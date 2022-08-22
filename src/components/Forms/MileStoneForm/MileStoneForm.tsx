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
import { reArrangeFirebase } from '../../../redux/slices/features/reArrangeTodos';

const formSchema = Yup.object().shape({
  Form: Yup.string(),
});
const MileStoneForm = () => {
  const [submitAnimation, setSubmitAnimation] = useState<boolean>(false);
  const [checkInternet, setCheckInternet] = useState<boolean>(true);

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
    };

    window.onoffline = () => {
      setCheckInternet(false);
    };
  }, [dispatch, todos, user]);

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
          className={` text-textLight flex items-center justify-center select-none`}
        >
          {user ? (
            <div className="w-full pb-10 md:pb-0">
              <div className="flex items-center justify-center ">
                <FormField
                  type="text"
                  label=""
                  name="Form"
                  value="form"
                  autoComplete="form"
                  placeholder="Enter a Milestone"
                  className={` py-4 px-4 rounded outline-none w-[70%] md:w-[70%] md:text-base text-xs`}
                  classNameField={`my-1 p-5 outline-none block w-full shadow-sm sm:text-sm border-gray-300 border-b-[1px] bg-primaryColor placeholder-white py-3 mt-3 font-Comfortaa text-sm md:text-base autoFillBg`}
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

export default MileStoneForm;
