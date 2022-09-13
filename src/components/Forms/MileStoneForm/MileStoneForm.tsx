import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { useState } from 'react';
import FormField from '../../FormField/FormField';
import {
  getTasks,
  setMilestones,
} from '../../../redux/slices/features/getTasksSlice';
import {
  RootState,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import { addMilestones } from '../../../redux/slices/features/MilestonesSlice';
import useWindowSize from '../../../hooks/useWindowsSize';

const formSchema = Yup.object().shape({
  Form: Yup.string(),
});
const MileStoneForm = ({ taskId }: { taskId: string }) => {
  const [submitAnimation, setSubmitAnimation] = useState<boolean>(false);
  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const width = useWindowSize();

  return (
    <Formik
      initialValues={{ milestoneForm: '' }}
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        const newDate = new Date();
        values.milestoneForm.length === 0
          ? false
          : dispatch(
              addMilestones({
                userUid: user,
                milestone: {
                  id: uuidv4(),
                  milestoneContent: values.milestoneForm,
                  milestoneCompleted: false,
                  milestoneDate: newDate.toISOString(),
                },
                allTasks: tasks,
                taskId: taskId,
              }),
            );

        values.milestoneForm.length === 0
          ? false
          : setTimeout(() => {
              dispatch(
                setMilestones({
                  milestone: {
                    id: uuidv4(),
                    milestoneContent: values.milestoneForm,
                    milestoneCompleted: false,
                    milestoneDate: newDate.toISOString(),
                  },
                  taskId: taskId,
                }),
              );
            }, 200);

        setSubmitAnimation(true);
        setTimeout(() => {
          setSubmitAnimation(false);
          dispatch(getTasks({ userUid: user }));
        }, 1000);

        resetForm();
      }}
    >
      {({}) => (
        <Form
          className={` text-textLight flex items-center justify-center select-none underlineAnimation`}
        >
          {user ? (
            <div className="w-full semiSm:pb-10 md:pb-0">
              <div className="flex items-center justify-center ">
                <FormField
                  type="text"
                  label=""
                  name="milestoneForm"
                  value="milestoneForm"
                  autoComplete="form"
                  placeholder="Enter Milestone"
                  className={` py-4 px-4 rounded outline-none w-[77%] md:w-[70%] md:text-base  text-textDark autoFillText`}
                  classNameField={`my-1 p-5 outline-none block w-full sm:text-sm  ${
                    dark
                      ? 'bg-primaryColor'
                      : 'sm:bg-primaryColor bg-secondaryLight'
                  } placeholder-white placeholder-opacity-[.7] py-3 mt-3 font-Comfortaa text-sm md:text-base text-white autoFillBg`}
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
            <h1 className="bg-secondaryColor py-4 px-10 rounded-md text-white ">
              Please login to add new tasks.
            </h1>
          )}
          <style>{`.autoFillBg{-webkit-box-shadow: 0 0 0 30px ${
            !dark && width < 840 ? '#56a691' : '#427676'
          } inset !important;}
            `}</style>
        </Form>
      )}
    </Formik>
  );
};

export default MileStoneForm;
