import { memo, SyntheticEvent } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { GoCheck } from 'react-icons/go';
import {
  MdModeEditOutline,
  MdEditOff,
  MdOutlineRemoveDone,
} from 'react-icons/md';
import { BiListPlus, BiX } from 'react-icons/bi';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { HiOutlineStar } from 'react-icons/hi';
//@ts-ignore
import { ProgressBar } from 'react-step-progress-bar';
import { batch } from 'react-redux';
import { useInViewport } from 'react-in-viewport';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  useAppDispatch,
  SingleTaskInterface,
  useAppSelector,
  RootState,
} from '../../../interfaces/interfaces';
import { completedTask } from '../../../redux/slices/features/fireBaseActions/completeTaskSlice';
import { removeTask } from '../../../redux/slices/features/fireBaseActions/deleteTaskSlice';
import {
  changeTaskImportantStateLocally,
  deleteTasksLocally,
  completeTaskLocally,
  lockTaskLocally,
  editTaskLocally,
} from '../../../redux/slices/features/getTasksSlice';
import { editTask } from '../../../redux/slices/features/fireBaseActions/editTaskSlice';
import useClickOutside from '../../../hooks/useClickOutside';
import TaskTypeMenu from '../../Forms/TaskForm/TaskTypeMenu';
import { changeTaskImportantState } from '../../../redux/slices/features/fireBaseActions/changeTaskImportantStateSlice';
import { setCardColorByTypeHandler } from '../../../utilities/setColorByTypeHandler';
import 'react-step-progress-bar/styles.css';
import { lockTask } from '../../../redux/slices/features/fireBaseActions/lockTaskSlice';
import { isOnline } from '../../../utilities/isOnline';
import { toggleOpenMilestonePanel } from '../../../redux/slices/features/openMilestonePanelPc';

const SingleTaskPc = ({
  task,
  tasks,
  index,
  taskId,
  user,
  setLoadInView,
  loadInView,
}: {
  task: SingleTaskInterface;
  tasks: SingleTaskInterface[];
  index: number;
  taskId: string;
  user: string;
  setLoadInView: any;
  loadInView: number;
}) => {
  const [deleteAnimation, setDeleteAnimation] = useState<boolean>(false);
  const [deleteTimer, setDeleteTimer] = useState<boolean>(false);
  const [completeAnimation, setCompleteAnimation] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(task?.content);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const disableDrag = useAppSelector(
    (state: RootState) => state.disableDragReducer.disableDragDnd,
  );
  const inViewPortRef = useRef(null);

  const { inViewport } = useInViewport(inViewPortRef);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: disableDrag ? '' : task?.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    if (inViewport && index >= loadInView - 3) {
      setLoadInView(loadInView + 10);
    }
  }, [index, inViewport, loadInView, setLoadInView]);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [edit]);

  const formatDate = moment(task?.date).format('MMM/D/YYYY');

  const milestoneCompleted = task?.milestones?.filter(
    (ms: any) => ms?.milestoneCompleted === true,
  )?.length;
  const percentage =
    milestoneCompleted && task.milestones?.length > 0
      ? Math.round((milestoneCompleted / task?.milestones?.length) * 100)
      : 0;

  let textareaRef = useClickOutside(() => {
    setEdit(false);
    setEditText(task?.content);
  });

  const editHanlder = (e: SyntheticEvent) => {
    e.preventDefault();

    batch(() => {
      if (isOnline()) {
        editText?.length === 0 || editText?.length > 50
          ? setEditText(task?.content)
          : dispatch(
              editTask({
                userUid: user,
                taskId: task?.id,
                allTasks: tasks,
                newTask: editText,
              }),
            );
      }

      editText?.length === 0 || editText?.length > 50
        ? setEditText(task?.content)
        : dispatch(editTaskLocally({ taskId: task?.id, taskEdit: editText }));
    });

    setEdit(false);
  };

  const deletionHandler = () => {
    batch(() => {
      if (isOnline()) {
        dispatch(
          removeTask({
            userUid: user,
            taskId: task?.id,
            allTasks: tasks,
          }),
        );
      }

      setDeleteAnimation(true);
      setTimeout(() => {
        dispatch(deleteTasksLocally({ taskId: task?.id }));
        setDeleteAnimation(false);
      }, 120);
    });
  };

  const completionHandler = () => {
    batch(() => {
      if (isOnline()) {
        dispatch(
          completedTask({
            userUid: user,
            taskId: task?.id,
            allTasks: tasks,
          }),
        );
      }
      setCompleteAnimation(true);

      setTimeout(() => {
        dispatch(completeTaskLocally({ taskId: task?.id }));

        setCompleteAnimation(false);
      }, 300);
    });
  };

  const importantStateHandler = () => {
    batch(() => {
      if (isOnline()) {
        dispatch(
          changeTaskImportantState({
            taskId: task?.id,
            userUid: user,
            allTasks: tasks,
          }),
        );
      }

      dispatch(changeTaskImportantStateLocally({ taskId: task?.id }));
    });
  };

  const lockTaskHandler = () => {
    batch(() => {
      if (isOnline()) {
        dispatch(
          lockTask({
            userUid: user,
            taskId: task?.id,
            allTasks: tasks,
          }),
        );
      }

      dispatch(lockTaskLocally({ taskId: task?.id }));
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`text-textLight  outline-[1px] hover:bg-opacity-90 relative   ${
        task?.important ? 'outline-[1px] outline outline-yellow-400' : ''
      }

           hover:transition-transform hover:ease-in-out font-Comfortaa font-semibold my-2 px-3 min-h-[11rem] relative ${
             task?.completed
               ? 'bg-red-400 shadow-2xl'
               : setCardColorByTypeHandler(true, task?.taskType)
           } flex flex-col justify-center items-center rounded ease-in-out
            ${
              deleteAnimation
                ? ' scale-75 transition-all opacity-50 ease-in-out'
                : ''
            } ${completeAnimation ? 'animate-bounce' : ''} `}
    >
      <div
        ref={inViewPortRef}
        className={`${
          edit ? 'hidden' : 'flex'
        } items-center justify-between w-full absolute top-[12px]  px-3 `}
      >
        <div className="text-xs w-fit whitespace-nowrap select-none">
          {formatDate}
        </div>
        <div className={` ${task?.completed ? 'hidden' : 'block'} `}>
          <HiOutlineStar
            title="Important Task"
            onClick={importantStateHandler}
            size={20}
            fill={task?.important ? '#e8b923' : 'none'}
            className={`transition-all ${
              task?.important ? '' : 'hover:fill-white hover:text-white'
            } ${task?.important ? 'text-yellow-300' : ''}  cursor-pointer`}
          />
        </div>
      </div>
      <div className="flex items-center w-full mt-4">
        <div
          className={`px-2 flex flex-col items-center ${
            edit ? 'hidden' : 'block'
          } w-[5%]  z-39 cursor-pointer`}
        >
          <div>
            {task?.locked ? (
              <HiLockClosed
                title="Unlock Task"
                type="button"
                onClick={lockTaskHandler}
                size={20}
                className="cursor-pointer  hover:text-white transition-all ease-in-out"
              />
            ) : (
              <HiLockOpen
                title="Lock Task"
                type="button"
                onClick={lockTaskHandler}
                size={20}
                className="cursor-pointer  hover:text-white transition-all ease-in-out"
              />
            )}
          </div>
          <div
            className={`mb-3 ml-[2px] ${task?.completed ? 'opacity-60' : ''}`}
          >
            <TaskTypeMenu
              user={user}
              tasks={tasks}
              isVertical={true}
              task={task}
            />
          </div>
        </div>

        {edit ? (
          <form
            ref={textareaRef}
            onSubmit={editHanlder}
            className="flex flex-col items-center justify-center w-full relative"
          >
            <textarea
              className={`textAreaNoResize p-2 outline-none w-[100%] shadow-sm rounded-t border-gray-300  placeholder-slate-400 `}
              onChange={(e) => setEditText(e.target.value)}
              value={editText}
              ref={inputRef}
              rows={3}
            />
            <button
              type="submit"
              className=" text-xs bg-opacity-30 text-white bg-black  py-1 rounded-b w-[100%] tracking-wider font-semibold transition-all ease-in-out whitespace-nowrap "
            >
              Submit
            </button>
            <span
              className={`absolute top-[4.3rem] right-2 text-[.65rem] ${
                editText?.length > 50 ? 'text-red-500' : ''
              }`}
            >
              {editText?.length}/50
            </span>
          </form>
        ) : (
          <div className="w-full ml-5 ">
            <div
              className={` flex-col  items-center flex ${
                task?.completed ? 'strike opacity-60' : ''
              }`}
            >
              <div className=" w-full mb-3 text-[.90rem] text-center">
                <span className="wrapWord">{task?.content}</span>
              </div>

              <div
                title="Milestones"
                onClick={() => dispatch(toggleOpenMilestonePanel(true))}
                className={`w-full flex items-center justify-center bottom-0 left-0 absolute  border-white border-t-[1px] border-opacity-10 bg-green-200 bg-opacity-20 hover:bg-opacity-40 hover:text-white transition-all`}
              >
                {task && task?.milestones?.length > 0 ? (
                  <div className="w-full flex items-center relative h-7 rounded-b ">
                    <div className="w-[75%] ml-2 border-[1px] border-white rounded border-opacity-30">
                      <ProgressBar
                        percent={percentage}
                        height={8}
                        filledBackground="linear-gradient(to right, #ccedde, #86d9b8)"
                        unfilledBackground="#f5faf8"
                      />
                      <div className="w-[20%]">
                        <span className="ml-5 text-[.80rem] absolute top-[6px]  right-[10px]">{`${milestoneCompleted}/${task?.milestones?.length}`}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <BiListPlus className={`opacity-80 mb-1`} size={25} />
                )}
              </div>
            </div>
          </div>
        )}

        <div className={` ${edit ? 'hidden' : 'flex'} flex-col pl-3 mb-3`}>
          {task?.completed ? (
            <MdOutlineRemoveDone
              title="Incomplete Task"
              type="button"
              onClick={completionHandler}
              size={20}
              className="cursor-pointer mb-2  hover:text-white transition-all "
            />
          ) : (
            <GoCheck
              title="Complete Task"
              type="button"
              onClick={completionHandler}
              size={21}
              className="cursor-pointer mb-2  hover:text-white transition-all "
            />
          )}

          {!edit ? (
            <button onClick={() => setEdit(true)} disabled={task?.completed}>
              <MdModeEditOutline
                title="Edit Task"
                type="submit"
                size={20}
                className={`  transition-all ${
                  task?.completed ? 'opacity-60' : 'hover:text-white'
                }`}
              />
            </button>
          ) : (
            <MdEditOff
              type="submit"
              onClick={() => setEdit(false)}
              size={20}
              className={`cursor-pointer  hover:text-white transition-all`}
            />
          )}

          {deleteTimer ? (
            <div
              className={`relative cursor-pointer mt-2 ${
                task?.completed
                  ? 'w-[1.2rem] h-[1.4rem]'
                  : 'w-[1.3rem] h-[22px]'
              }`}
              onClick={() => setDeleteTimer(false)}
            >
              <BiX
                className={`absolute h-[.5] w-[.5] top-[3px] ${
                  task?.completed ? 'left-[.22rem]' : 'left-[.19rem]'
                }`}
              />
              <CountdownCircleTimer
                size={22}
                strokeWidth={2}
                isPlaying
                duration={1.5}
                // @ts-ignore
                trailColor={
                  task?.completed
                    ? '#f87171'
                    : setCardColorByTypeHandler(false, task?.taskType)
                }
                colors="#ffff"
                onComplete={() => {
                  setDeleteTimer(false);
                  deletionHandler();
                }}
              />
            </div>
          ) : (
            <button
              disabled={task?.locked}
              onClick={() => setDeleteTimer(true)}
              className={`mt-2 ${task?.locked ? 'cursor-default' : ''}`}
              title="Delete Task"
              type="button"
            >
              <AiFillDelete
                size={20}
                type="submit"
                className={` transition-all h-[1.35rem] ${
                  task?.locked ? 'opacity-50 ' : 'hover:text-white '
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SingleTaskPc);
