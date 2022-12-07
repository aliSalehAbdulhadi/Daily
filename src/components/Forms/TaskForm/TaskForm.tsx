import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { memo, useEffect, useRef, useState } from 'react';
import { batch } from 'react-redux';
import FormField from '../../FormField/FormField';
import { addTask } from '../../../redux/slices/features/fireBaseActions/addTaskSlice';
import {
  addTasksDatesLocally,
  addTasksLocally,
} from '../../../redux/slices/features/getTasksSlice';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import { isOnline } from '../../../utilities/isOnline';
import { Dark, UserKey } from '../../../utilities/globalImports';

const formSchema = Yup.object().shape({
  Form: Yup.string().max(50, 'Too Long!'),
});
const TaskForm = () => {
  const [submitAnimation, setSubmitAnimation] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const allTasksCount = useAppSelector(
    (state: RootState) => state.getTaskReducer?.allTasksCount,
  );

  const dark = Dark();
  const dispatch = useAppDispatch();
  const user = UserKey();

  const uuid = uuidv4();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.blur();
  }, [submitAnimation]);

  const taskColor = [
    'green-4',
    'blue-4',
    'amber-2',
    'pink-4',
    'purple-4',
    'teal-4',
    'salmon',
    'emerald-5',
  ];

  const randomNum = Math.floor(Math.random() * (7 - 0) + 0);

  return (
    <Formik
      initialValues={{ Form: '' }}
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        const newDate = new Date();
        if (isOnline()) {
          values.Form?.length === 0 || values.Form?.length > 50
            ? false
            : dispatch(
                addTask({
                  task: {
                    content: values.Form,
                    completed: false,
                    id: uuid,
                    taskType: taskColor[randomNum],
                    date: newDate.toISOString(),
                    important: false,
                    locked: false,
                    milestones: [],
                  },
                  userUid: user,
                  tasksDates: { date: newDate.toISOString(), id: uuid },
                  allTasksCount: allTasksCount + 1,
                }),
              );
        }

        values.Form?.length === 0 || values.Form?.length > 50
          ? false
          : setTimeout(() => {
              batch(() => {
                dispatch(
                  addTasksLocally({
                    content: values.Form,
                    completed: false,
                    id: uuid,
                    taskType: taskColor[randomNum],
                    date: newDate.toISOString(),
                    important: false,
                    locked: false,
                    milestones: [],
                  }),
                );

                dispatch(
                  addTasksDatesLocally({
                    date: newDate.toISOString(),
                    id: uuid,
                  }),
                );
              });
            }, 200);

        setSubmitAnimation(true);
        setTimeout(() => {
          setSubmitAnimation(false);
        }, 1000);
        setValue('');
        resetForm();
      }}
    >
      {({}) => (
        <Form
          ref={formRef}
          onChange={(e: any) => setValue(e?.target.value)}
          className={` ${dark ? 'bg-primaryColor' : 'bg-primaryLight'} pt-3 ${
            dark ? 'text-textDark' : 'text-textLight'
          } flex items-center justify-center select-none  h-[15vh] semiSm:h-fit`}
        >
          {user ? (
            <div className=" flex flex-col mb-5 semiSm:mb-0 ml-7 semiSm:ml-0 xl:w-[40%] md:w-[50%] w-[70%] relative">
              <div className="flex items-center justify-center  w-full ">
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
                    dark
                      ? 'bg-textDark'
                      : 'semiSm:bg-secondaryLight bg-primaryColor'
                  } ${
                    dark ? 'text-textLight' : 'text-textDark'
                  } text-sm md:text-base ${dark ? '' : 'placeholder-textDark'}`}
                />
                <div
                  className={`absolute text-xs font-light semiSm:font-normal top-[60px] semiSm:top-[64px] right-10 semiSm:right-11  ${
                    value?.length > 0 ? 'visible' : 'invisible'
                  } ${
                    value?.length > 50
                      ? 'text-red-500'
                      : dark
                      ? 'text-white'
                      : 'text-black'
                  }`}
                >
                  <span>{value?.length}</span>
                  <span>/</span>
                  <span>50</span>
                </div>
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
              <h1
                className={`text-xs semiSm:text-sm self-start ml-1 font-Comfortaa ${
                  value?.length > 50 ? 'hidden' : 'block'
                }`}
              >
                What are you up to today?
              </h1>
            </div>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};

export default memo(TaskForm);
