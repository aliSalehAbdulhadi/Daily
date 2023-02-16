import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { v4 as uuidv4 } from 'uuid';
import { MdClose } from 'react-icons/md';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import {
  SingleTaskInterface,
  useAppDispatch,
} from '../../../interfaces/interfaces';
import { addMilestoneLocally } from '../../../redux/slices/features/getTasksSlice';
import { addMilestones } from '../../../redux/slices/features/fireBaseActions/MilestonesSlice';
import { modules } from '../../../utilities/quillToolBar';
import { isOnline } from '../../../utilities/isOnline';
import { Dark, Tasks, UserKey } from '../../../utilities/globalImports';

const AdvancedForm = ({
  taskId,
  setOpenAdvancedForm,
  setScroll,
}: {
  taskId: string;
  setScroll?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAdvancedForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState('');

  const dispatch = useAppDispatch();
  const user = UserKey();
  const tasks: SingleTaskInterface[] = Tasks();
  const dark = Dark();

  const quillRef = useRef(null);
  useEffect(() => {
    //@ts-ignore
    quillRef?.current?.focus();
  });

  function isQuillEmpty(value: string) {
    if (
      value.replace(/<(.|\n)*?>/g, '').trim().length === 0 &&
      !value.includes('<img')
    ) {
      return true;
    }
    return false;
  }

  const uuid = uuidv4();

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    const newDate = new Date();

    if (isOnline()) {
      isQuillEmpty(value)
        ? false
        : dispatch(
            addMilestones({
              userUid: user,
              milestone: {
                id: uuid,
                milestoneContent: value,
                milestoneCompleted: false,
                milestoneDate: newDate.toISOString(),
              },
              allTasks: tasks,
              taskId: taskId,
            }),
          );
    }

    isQuillEmpty(value)
      ? false
      : setTimeout(() => {
          dispatch(
            addMilestoneLocally({
              milestone: {
                id: uuid,
                milestoneContent: value,
                milestoneCompleted: false,
                milestoneDate: newDate.toISOString(),
              },
              taskId: taskId,
            }),
          );
        }, 200);

    setValue('');
  };

  return (
    <form
      onSubmit={(e) => formSubmitHandler(e)}
      className=" border-t-[1px] w-full semiSm:rounded relative shadow-lg "
    >
      <button
        type="button"
        onClick={() => {
          setOpenAdvancedForm(false);
          setValue('');
        }}
        className="absolute ml-10 text-black right-2 top-[.60rem] hidden semiSm:block "
      >
        <MdClose
          className="rounded-lg hover:text-red-600 opacity-[.75]"
          size={20}
        />
      </button>

      <ReactQuill
        id="quill"
        modules={modules}
        className={`${
          dark ? 'bg-secondaryColor' : 'bg-primaryColor'
        }} semiSm:rounded`}
        theme="snow"
        value={value}
        onChange={setValue}
        onFocus={() => setScroll && setScroll(true)}
        ref={quillRef}
      />

      <div className="w-full flex items-center ">
        <button
          className="w-[75%] semiSm:w-full py-2 bg-primaryLight text-black semiSm:rounded-b "
          type="submit"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => {
            setOpenAdvancedForm(false);
            setValue('');
          }}
          className="bg-red-400 w-[25%] flex items-center justify-center semiSm:hidden h-full py-2"
        >
          <MdClose
            className="rounded-lg opacity-[.75] "
            fill="white"
            size={20}
          />
        </button>
      </div>
    </form>
  );
};

export default AdvancedForm;
