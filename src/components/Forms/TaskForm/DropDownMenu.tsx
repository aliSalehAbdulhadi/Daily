import { SyntheticEvent, useEffect, useState } from 'react';
import { BsFillPersonFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { MdWork } from 'react-icons/md';
import { IoGameController } from 'react-icons/io5';
import useClickOutside from '../../../hooks/useClickOutside';
import {
  RootState,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import { addTaskType } from '../../../redux/slices/features/addTaskTypeSlice';
import { addTaskTypeLocally } from '../../../redux/slices/features/getTasksSlice';

const DropDownMenu = ({ task }: { task: SingleTaskInterface }) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [value, setValue] = useState<string>(task?.taskType);
  const dispatch = useAppDispatch();
  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  let domNode = useClickOutside(() => {
    setHidden(true);
  });
  const iconsHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setValue(target.value);
    setHidden(true);
  };

  useEffect(() => {
    dispatch(
      addTaskType({
        userUid: user,
        taskId: task?.id,
        allTasks: tasks,
        taskType: value,
      }),
    );
    dispatch(addTaskTypeLocally({ taskId: task?.id, taskType: value }));
  }, [value]);

  const dynamicIconHandler = () => {
    if (value === 'personal' || !value) {
      return (
        <BsFillPersonFill
          size={22}
          title="Task Type"
          className={`${!hidden ? 'hidden' : 'block'} `}
        />
      );
    }

    if (value === 'work') {
      return (
        <MdWork
          size={22}
          title="Task Type"
          className={`${!hidden ? 'hidden' : 'block'} `}
        />
      );
    }

    if (value === 'fun') {
      return (
        <IoGameController
          size={22}
          title="Task Type"
          className={`${!hidden ? 'hidden' : 'block'} `}
        />
      );
    }
  };

  return (
    <div
      ref={domNode}
      className={` flex semiSm:flex-col items-center justify-center `}
    >
      <button
        disabled={task?.completed}
        type="button"
        className="self-end hover:text-white transition-all ease-in-out"
        onClick={() => setHidden(false || task?.completed)}
      >
        {dynamicIconHandler()}
      </button>
      <button
        type="button"
        className="flex justify-end bgp- hover:text-white transition-all ease-in-out"
        value="personal"
        onClick={(e) => iconsHandler(e)}
      >
        <BsFillPersonFill
          size={22}
          className={`pointer-events-none mr-5 semiSm:mr-0 semiSm:mb-2 ${
            task?.taskType === 'personal' ? 'fill-white' : 'fill-green-400'
          } ${hidden ? 'hidden' : 'block'} `}
        />
      </button>
      <button
        type="button"
        className="flex justify-end  hover:text-white transition-all ease-in-out"
        value="work"
        onClick={(e) => iconsHandler(e)}
      >
        <MdWork
          size={22}
          className={`pointer-events-none mr-5 semiSm:mr-0 semiSm:mb-2  ${
            task?.taskType === 'work' ? 'fill-white' : 'fill-blue-400'
          }   ${hidden ? 'hidden' : 'block'} `}
        />
      </button>
      <button
        type="button"
        className="flex justify-end hover:text-white transition-all ease-in-out"
        value="fun"
        onClick={(e) => iconsHandler(e)}
      >
        <IoGameController
          size={22}
          className={`pointer-events-none ${
            task?.taskType === 'fun' ? 'fill-white' : 'fill-purple-400'
          }   ${hidden ? 'hidden' : 'block'} `}
        />
      </button>
    </div>
  );
};

export default DropDownMenu;
