import { memo, SyntheticEvent } from 'react';
import { GoCheck } from 'react-icons/go';
import { MdOutlineRemoveDone } from 'react-icons/md';
import { HiOutlineStar } from 'react-icons/hi';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import { BiListPlus } from 'react-icons/bi';
import { useState, useEffect, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import Link from 'next/link';
import { batch } from 'react-redux';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
  SingleTaskInterface,
} from '../../../interfaces/interfaces';
import { completedTask } from '../../../redux/slices/features/fireBaseActions/completeTaskSlice';
import {
  changeTaskImportantStateLocally,
  deleteTasksLocally,
  completeTaskLocally,
  lockTaskLocally,
  editTaskLocally,
} from '../../../redux/slices/features/getTasksSlice';
import { editTask } from '../../../redux/slices/features/fireBaseActions/editTaskSlice';
import useClickOutside from '../../../hooks/useClickOutside';
import ProgressBar from '../../progressBar/ProgressBar';
import Swipeable from '../../swipeable/Swipeable';
import TaskTypeMenu from '../../Forms/TaskForm/TaskTypeMenu';
import { changeTaskImportantState } from '../../../redux/slices/features/fireBaseActions/changeTaskImportantStateSlice';
import { setCardColorByTypeHandler } from '../../../utilities/setColorByTypeHandler';
import { lockTask } from '../../../redux/slices/features/fireBaseActions/lockTaskSlice';
import { isOnline } from '../../../utilities/isOnline';
import { removeTask } from '../../../redux/slices/features/fireBaseActions/deleteTaskSlice';

const SingleTaskMobile = ({
  task,
  tasks,
  user,
  index,
}: {
  task: SingleTaskInterface;
  tasks: SingleTaskInterface[];
  user: string;
  index: number;
}) => {
  const [completeAnimation, setCompleteAnimation] = useState<boolean>(false);
  const [deleteAnimation, setDeleteAnimation] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(task?.content);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    inputRef?.current?.focus();
  }, [edit]);

  const formatDate = moment(task?.date).format('MMM/D/YYYY');
  const disableSwiper = useAppSelector(
    (state: RootState) => state.disableSwiperReducer.disableSwiper,
  );
  const disableDrag = useAppSelector(
    (state: RootState) => state.disableDragReducer.disableDragDnd,
  );
  const milestoneCompleted = task?.milestones?.filter(
    (ms: any) => ms?.milestoneCompleted === true,
  ).length;
  const percentage =
    milestoneCompleted && task?.milestones.length > 0
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
        editText?.length === 0 || editText.length > 50
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

      editText?.length === 0 || editText.length > 50
        ? setEditText(task?.content)
        : dispatch(editTaskLocally({ taskId: task?.id, taskEdit: editText }));
    });

    setEdit(false);
  };

  const completionHandler = () => {
    setCompleteAnimation(true);
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

      setTimeout(() => {
        dispatch(completeTaskLocally({ taskId: task?.id }));
        setCompleteAnimation(false);
      }, 200);
    });
  };

  const deletionHandler = () => {
    if (!disableSwiper || task?.locked) return;

    setDeleteAnimation(true);
    batch(() => {
      // if (isOnline()) {
      //   dispatch(
      //     removeTask({
      //       userUid: user,
      //       taskId: task?.id,
      //       allTasks: tasks,
      //     }),
      //   );
      // }

      setTimeout(() => {
        dispatch(deleteTasksLocally({ index: index }));
        setDeleteAnimation(false);
      }, 250);
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
    <Draggable
      key={task?.id}
      draggableId={task?.id}
      index={index}
      isDragDisabled={disableDrag}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="pb-3"
        >
          <Swipeable
            disableSwiper={disableSwiper}
            taskLocked={task?.locked}
            handler={deletionHandler}
          >
            <div
              className={` taskMobileEnter  flex text-textLight
          font-Comfortaa font-semibold ${
            task?.important && !task?.completed
              ? 'border-[1px] border-yellow-400'
              : task?.completed
              ? ''
              : `border-[1px] ${setCardColorByTypeHandler(
                  false,
                  task?.taskType,
                )}`
          }


          
          ${
            task?.completed
              ? 'bg-red-400'
              : setCardColorByTypeHandler(true, task?.taskType)
          }  rounded text-sm ease-in-out 
            ${
              deleteAnimation
                ? 'translate-x-[-35rem] transition-all duration-300 ease-in-out'
                : ''
            } ${
                completeAnimation
                  ? 'translate-x-[18.5rem] transition-all duration-300 ease-in-out'
                  : ''
              } `}
            >
              <div
                className={`flex flex-col justify-between my-0 px-3  py-2 min-h-[9.5rem]  ${
                  task && task?.milestones?.length <= 0 && task?.completed
                    ? 'w-full'
                    : 'w-[75%] mobileTaskCardBoxShadow'
                }`}
              >
                <div
                  className={`${
                    edit ? 'hidden' : 'block'
                  } items-center justify-between mt-1 flex`}
                >
                  <HiOutlineStar
                    onClick={importantStateHandler}
                    size={20}
                    fill={task?.important ? '#e8b923' : 'none'}
                    className={`${task?.important ? 'text-yellow-300' : ''} ${
                      task?.completed ? 'invisible' : 'visible'
                    }`}
                  />
                  <div className="text-[.65rem]  w-fit whitespace-nowrap select-none">
                    {formatDate}
                  </div>
                </div>
                <div className="relative ml-1">
                  {edit ? (
                    <form
                      ref={textareaRef}
                      onSubmit={editHanlder}
                      className="flex flex-col  mt-2"
                    >
                      <textarea
                        className={`textAreaNoResize my-1 p-1 pb-5 outline-none w-full text-sm shadow-sm sm:text-base border-gray-300 rounded-t placeholder-slate-400`}
                        onChange={(e) => setEditText(e.target.value)}
                        value={editText}
                        ref={inputRef}
                        rows={3}
                      />
                      <button
                        type="submit"
                        className="text-xs bg-opacity-30 text-white bg-black border-[1px] py-2 px-4 w-full rounded-b self-center mt-2 tracking-wider font-semibold  transition-all ease-in-out whitespace-nowrap"
                      >
                        Submit
                      </button>
                      <span
                        className={`absolute top-[4.5rem] right-2 text-[.65rem] ${
                          editText?.length > 50 ? 'text-red-500' : ''
                        }`}
                      >
                        {editText?.length}/50
                      </span>
                    </form>
                  ) : (
                    <div className="w-full ">
                      <div
                        className={`flex w-full  h-full flex-col items-center ${
                          task?.completed ? 'strike opacity-60' : ''
                        }`}
                      >
                        <div className="self-start w-full ">
                          <span
                            onClick={() =>
                              task?.completed ? null : setEdit(true)
                            }
                            className="wrapWord"
                          >
                            {task?.content}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center ml-[.31rem]">
                  <button
                    type="button"
                    className={` h-[2rem] w-fit flex items-center ${
                      edit ? 'hidden' : 'flex'
                    }`}
                  >
                    {task?.completed ? (
                      <MdOutlineRemoveDone
                        title="Incomplete"
                        onClick={completionHandler}
                        className="cursor-pointer mr-5 scale-[1.8] transition-all ease-in-out"
                      />
                    ) : (
                      <GoCheck
                        title="Complete task"
                        onClick={completionHandler}
                        className="cursor-pointer  mr-5 scale-[1.8] transition-all ease-in-out"
                      />
                    )}
                  </button>

                  <div
                    className={`mr-[1.15rem] ${
                      task?.completed ? 'opacity-60' : ''
                    } ${edit ? 'hidden' : ''}`}
                  >
                    <TaskTypeMenu
                      user={user}
                      tasks={tasks}
                      isVertical={false}
                      task={task}
                    />
                  </div>

                  <button type="button" className={`${edit ? 'hidden' : ''}`}>
                    {task?.locked ? (
                      <HiLockClosed
                        title="lock task"
                        onClick={lockTaskHandler}
                        size={20}
                      />
                    ) : (
                      <HiLockOpen
                        title="lock task"
                        onClick={lockTaskHandler}
                        size={20}
                      />
                    )}
                  </button>
                </div>
              </div>
              <Link href={`/tasks/${task?.id}`}>
                {task && task?.milestones?.length > 0 ? (
                  <div className=" w-[25%] flex flex-col items-center justify-center  bg-[#64f5c56c] rounded-tr rounded-br">
                    <div className="scale-[.8]">
                      <ProgressBar percentage={percentage} />
                    </div>
                    <div className="flex items-center mt-1">
                      <h1>{milestoneCompleted}</h1>
                      <span className="scale-[.80]">/</span>
                      <span>{task?.milestones.length}</span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`flex items-center justify-end w-[25%] bg-[#64f5c56c] pr-2 ${
                      task && task?.milestones?.length <= 0 && task?.completed
                        ? 'hidden'
                        : 'block'
                    }`}
                  >
                    <BiListPlus className="opacity-80" size={30}></BiListPlus>
                  </div>
                )}
              </Link>
            </div>
          </Swipeable>
        </div>
      )}
    </Draggable>
  );
};

export default memo(SingleTaskMobile);
