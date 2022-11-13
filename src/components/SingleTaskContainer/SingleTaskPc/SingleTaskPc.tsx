import { SyntheticEvent } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { GoCheck } from 'react-icons/go';
import {
  MdModeEditOutline,
  MdEditOff,
  MdOutlineRemoveDone,
} from 'react-icons/md';
import { BiX } from 'react-icons/bi';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import { useState, useEffect, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { HiOutlineStar } from 'react-icons/hi';
//@ts-ignore
import { ProgressBar } from 'react-step-progress-bar';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
  SingleTaskInterface,
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

const SingleTaskPc = ({
  content,
  index,
  taskId,
  defaultTaskId,
}: {
  content: SingleTaskInterface;
  index: number;
  taskId: string;
  defaultTaskId: any;
}) => {
  const [deleteAnimation, setDeleteAnimation] = useState<boolean>(false);
  const [deleteTimer, setDeleteTimer] = useState<boolean>(false);
  const [completeAnimation, setCompleteAnimation] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(content?.content);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  useEffect(() => {
    inputRef?.current?.focus();
  }, [edit]);

  const formatDate = moment(content?.date).format('MMM/D/YYYY');

  const task = tasks?.find((task) => task?.id === defaultTaskId);
  const milestoneCompleted = task?.milestones?.filter(
    (ms: any) => ms?.milestoneCompleted === true,
  ).length;
  const percentage =
    milestoneCompleted && task.milestones.length > 0
      ? Math.round((milestoneCompleted / task?.milestones?.length) * 100)
      : 0;

  let textareaRef = useClickOutside(() => {
    setEdit(false);
    setEditText(content?.content);
  });

  const editHanlder = (e: SyntheticEvent) => {
    e.preventDefault();

    if (isOnline()) {
      editText?.length === 0 || editText?.length > 50
        ? setEditText(content?.content)
        : dispatch(
            editTask({
              userUid: user,
              taskId: content?.id,
              allTasks: tasks,
              newTask: editText,
            }),
          );
    }

    editText?.length === 0 || editText?.length > 50
      ? setEditText(content?.content)
      : dispatch(editTaskLocally({ taskId: content?.id, taskEdit: editText }));

    setEdit(false);
  };

  const deletionHandler = () => {
    if (isOnline()) {
      dispatch(
        removeTask({
          userUid: user,
          taskId: content?.id,
          allTasks: tasks,
        }),
      );
    }

    setDeleteAnimation(true);
    setTimeout(() => {
      dispatch(deleteTasksLocally({ taskId: content?.id }));

      setDeleteAnimation(false);
    }, 200);
  };

  const completionHandler = () => {
    if (isOnline()) {
      dispatch(
        completedTask({
          userUid: user,
          taskId: content?.id,
          allTasks: tasks,
        }),
      );
    }
    setCompleteAnimation(true);

    setTimeout(() => {
      dispatch(completeTaskLocally({ taskId: content?.id }));

      setCompleteAnimation(false);
    }, 300);
  };

  const importantStateHandler = () => {
    if (isOnline()) {
      dispatch(
        changeTaskImportantState({
          taskId: content?.id,
          userUid: user,
          allTasks: tasks,
        }),
      );
    }

    dispatch(changeTaskImportantStateLocally({ taskId: content?.id }));
  };

  const lockTaskHandler = () => {
    if (isOnline()) {
      dispatch(
        lockTask({
          userUid: user,
          taskId: content?.id,
          allTasks: tasks,
        }),
      );
    }

    dispatch(lockTaskLocally({ taskId: content?.id }));
  };

  return (
    <Draggable key={content?.id} draggableId={content?.id} index={index}>
      {(provided) => (
        <div
          className={`text-textLight  outline-[1px] relative ${
            content?.important ? 'outline-[1px] outline outline-yellow-400' : ''
          }
           hover:transition-transform hover:ease-in-out font-Comfortaa font-semibold my-2 px-5 min-h-[10rem] relative ${
             content?.completed
               ? 'bg-red-400 shadow-2xl'
               : setCardColorByTypeHandler(true, content)
           } flex flex-col justify-center items-center rounded ease-in-out
            ${
              deleteAnimation
                ? 'translate-x-[-35rem] transition-all ease-in-out'
                : ''
            } ${completeAnimation ? 'animate-bounce' : ''} `}
          {...provided?.draggableProps}
          {...provided?.dragHandleProps}
          ref={provided?.innerRef}
        >
          <div
            className={`${
              edit ? 'hidden' : 'flex'
            } items-center justify-between w-full absolute top-[12px]  px-5 `}
          >
            <div className="text-xs w-fit whitespace-nowrap select-none">
              {formatDate}
            </div>
            <div className={`${content?.completed ? 'hidden' : 'block'} `}>
              <HiOutlineStar
                onClick={importantStateHandler}
                size={20}
                fill={content.important ? '#e8b923' : 'none'}
                className={`transition-all ${
                  content?.important ? '' : 'hover:fill-white hover:text-white'
                } ${
                  content?.important ? 'text-yellow-300' : ''
                } mr-[.6rem] cursor-pointer`}
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
                    title="lock task"
                    type="button"
                    onClick={lockTaskHandler}
                    size={20}
                    className="cursor-pointer  hover:text-white transition-all ease-in-out"
                  />
                ) : (
                  <HiLockOpen
                    title="lock task"
                    type="button"
                    onClick={lockTaskHandler}
                    size={20}
                    className="cursor-pointer  hover:text-white transition-all ease-in-out"
                  />
                )}
              </div>
              <div className={`${task?.completed ? 'opacity-60' : ''}`}>
                <TaskTypeMenu isVertical={true} task={content} />
              </div>
            </div>

            {edit ? (
              <form
                ref={textareaRef}
                onSubmit={editHanlder}
                className="flex flex-col items-center justify-center w-full relative"
              >
                <textarea
                  className={`textAreaNoResize p-2 outline-none w-[60%] shadow-sm rounded-t border-gray-300  placeholder-slate-400 `}
                  onChange={(e) => setEditText(e.target.value)}
                  value={editText}
                  ref={inputRef}
                  rows={3}
                />
                <button
                  type="submit"
                  className=" text-xs bg-opacity-30 text-white bg-black  py-1 rounded-b w-[60%] tracking-wider font-semibold transition-all ease-in-out whitespace-nowrap "
                >
                  Submit
                </button>
                <span
                  className={`absolute top-[4rem] right-32 text-[.65rem] ${
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
                    content?.completed ? 'strike opacity-60' : ''
                  }`}
                >
                  <div>
                    <span className="wrapWord">{content?.content}</span>
                  </div>

                  <div
                    className={`w-full flex items-center justify-center bottom-[.55rem] ${
                      task && task?.milestones.length > 0
                        ? 'absolute'
                        : 'hidden'
                    }`}
                  >
                    <div className="w-[50%] relative">
                      <ProgressBar
                        percent={percentage}
                        height={8}
                        filledBackground="linear-gradient(to right, #ccedde, #86d9b8)"
                        unfilledBackground="#f5faf8"
                      />
                      <span className="ml-5 text-[.80rem] absolute top-[-5.7px] right-[-30px]">{`${milestoneCompleted}/${task?.milestones?.length}`}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={` ${edit ? 'hidden' : 'flex'} flex-col pl-10 mt-2`}>
              {content?.completed ? (
                <MdOutlineRemoveDone
                  title="Incomplete"
                  type="button"
                  onClick={completionHandler}
                  size={20}
                  className="cursor-pointer mb-2 mr-2 hover:text-white transition-all "
                />
              ) : (
                <GoCheck
                  title="Complete task"
                  type="button"
                  onClick={completionHandler}
                  size={21}
                  className="cursor-pointer mb-2 mr-2 hover:text-white transition-all "
                />
              )}

              {!edit ? (
                <button
                  onClick={() => setEdit(true)}
                  disabled={task?.completed}
                >
                  <MdModeEditOutline
                    title="Edit"
                    type="submit"
                    size={20}
                    className={`mb-2 mr-2  transition-all ${
                      task?.completed ? 'opacity-60' : 'hover:text-white'
                    }`}
                  />
                </button>
              ) : (
                <MdEditOff
                  type="submit"
                  onClick={() => setEdit(false)}
                  size={20}
                  className={`cursor-pointer mb-2 mr-2 hover:text-white transition-all`}
                />
              )}

              {deleteTimer ? (
                <div
                  className="relative cursor-pointer w-fit h-fit "
                  onClick={() => setDeleteTimer(false)}
                >
                  <BiX className="absolute h-4 w-4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
                  <CountdownCircleTimer
                    size={22}
                    strokeWidth={2}
                    isPlaying
                    duration={1.5}
                    // @ts-ignore
                    trailColor={
                      content?.completed
                        ? '#f87171'
                        : setCardColorByTypeHandler(false, content)
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
                  className={`${task?.locked ? 'cursor-default' : ''}`}
                  title="Delete"
                  type="button"
                >
                  <AiFillDelete
                    type="submit"
                    className={`scale-[1.3] ml-[.10rem] h-[1.35rem] transition-all  ${
                      task?.locked ? 'opacity-50 ' : 'hover:text-white '
                    }`}
                  />
                </button>
              )}
            </div>
          </div>

          {content?.id === taskId ? (
            <div>
              <div className="selectedTask pointer-events-none bg-white h-[7rem] w-[1px] text-transparent  absolute top-[50%] translate-y-[-50%] left-[-10px]">
                .
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </Draggable>
  );
};

export default SingleTaskPc;
