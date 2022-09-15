import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { v4 as uuidv4 } from 'uuid';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import {
  RootState,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import {
  getTasks,
  setMilestones,
} from '../../../redux/slices/features/getTasksSlice';
import { addMilestones } from '../../../redux/slices/features/MilestonesSlice';
import { modules } from '../../../utilities/quillToolBar';
import { FaWindowClose } from 'react-icons/fa';
import { AiFillCloseSquare } from 'react-icons/ai';

const AdvancedForm = ({
  taskId,
  setOpenAdvancedForm,
}: {
  taskId: string;
  setOpenAdvancedForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState('');
  const [submitAnimation, setSubmitAnimation] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'color',
    'image',
  ];

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    const newDate = new Date();

    value.length === 0
      ? false
      : dispatch(
          addMilestones({
            userUid: user,
            milestone: {
              id: uuidv4(),
              milestoneContent: value,
              milestoneCompleted: false,
              milestoneDate: newDate.toISOString(),
            },
            allTasks: tasks,
            taskId: taskId,
          }),
        );

    value.length === 0
      ? false
      : setTimeout(() => {
          dispatch(
            setMilestones({
              milestone: {
                id: uuidv4(),
                milestoneContent: value,
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

    setValue('');
  };

  return (
    <form
      onSubmit={(e) => formSubmitHandler(e)}
      className="border-[1px] w-full rounded relative "
    >
      <button
        type="button"
        onClick={() => {
          setOpenAdvancedForm(false);
          setValue('');
        }}
        className="absolute text-black right-2 top-[.60rem] "
      >
        <AiFillCloseSquare className="rounded-lg opacity-[.75]" size={20} />
      </button>
      <ReactQuill
        id="quill"
        modules={modules}
        className={`${dark ? 'bg-secondaryColor' : 'bg-primaryColor'}}`}
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <button className="w-full py-2 bg-primaryLight text-black" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AdvancedForm;
