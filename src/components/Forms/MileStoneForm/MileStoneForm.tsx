import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { useState } from 'react';
import FormField from '../../FormField/FormField';
import {
  getTodo,
  setMilestones,
} from '../../../redux/slices/features/getTodoSlice';
import {
  RootState,
  SingleTodoInterface,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import { addMilestones } from '../../../redux/slices/features/MilestonesSlice';

const formSchema = Yup.object().shape({
  Form: Yup.string(),
});
const MileStoneForm = ({ taskId }: { taskId: string }) => {
  const [submitAnimation, setSubmitAnimation] = useState<boolean>(false);
  const todos: SingleTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
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
              addMilestones({
                userUid: user,
                milestone: {
                  id: uuidv4(),
                  milestoneContent: values.Form,
                  milestoneCompleted: false,
                },
                allTodos: todos,
                todoId: taskId,
              }),
            );

        values.Form.length === 0
          ? false
          : setTimeout(() => {
              dispatch(
                setMilestones({
                  milestone: {
                    id: uuidv4(),
                    milestoneContent: values.Form,
                  },
                  todoId: taskId,
                }),
              );
            }, 200);

        setSubmitAnimation(true);
        setTimeout(() => {
          setSubmitAnimation(false);
          dispatch(getTodo({ userUid: user }));
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
                  className={` py-4 px-4 rounded outline-none w-[70%] md:w-[70%] md:text-base text-xs text-textDark autoFillText`}
                  classNameField={`my-1 p-5 outline-none block w-full shadow-sm sm:text-sm border-gray-300 border-b-[1px] bg-primaryColor placeholder-white py-3 mt-3 font-Comfortaa text-sm md:text-base text-white autoFillBg`}
                />

                <button
                  title="Submit"
                  type="submit"
                  className={`text-textDark scale-[1.6] mt-2 rounded-br-md `}
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
