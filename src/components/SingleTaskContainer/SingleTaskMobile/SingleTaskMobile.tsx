import { SyntheticEvent } from 'react';
import { GoCheck } from 'react-icons/go';
import { MdOutlineRemoveDone } from 'react-icons/md';
import { HiOutlineStar } from 'react-icons/hi';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import { BiListPlus } from 'react-icons/bi';
import { useState, useEffect, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import Link from 'next/link';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
  SingleTaskInterface,
} from '../../../interfaces/interfaces';
import { completedTask } from '../../../redux/slices/features/completeTaskSlice';
import {
  changeTaskImportantStateLocally,
  deleteTask,
  getTasks,
  completeTaskLocally,
  lockTaskLocally,
} from '../../../redux/slices/features/getTasksSlice';
import { editTask } from '../../../redux/slices/features/editTaskSlice';
import useClickOutside from '../../../hooks/useClickOutside';
import ProgressBar from '../../progressBar/ProgressBar';
import Swipeable from '../../swipeable/Swipeable';
import { removeTask } from '../../../redux/slices/features/deleteTaskSlice';
import TaskTypeMenu from '../../Forms/TaskForm/TaskTypeMenu';
import { changeTaskImportantState } from '../../../redux/slices/features/changeTaskImportantStateSlice';
import { setCardColorByTypeHandler } from '../../../utilities/setColorByTypeHandler';
import { lockTask } from '../../../redux/slices/features/lockTaskSlice';

const SingleTaskMobile = ({
  content,
  index,
  taskId,
}: {
  content: SingleTaskInterface;
  index: number;
  taskId: string;
}) => {
  const [completeAnimation, setCompleteAnimation] = useState<boolean>(false);
  const [deleteAnimation, setDeleteAnimation] = useState<boolean>(false);
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
  const disableSwiper = useAppSelector(
    (state: RootState) => state.disableSwiperReducer.disableSwiper,
  );
  const disableDrag = useAppSelector(
    (state: RootState) => state.disableDragReducer.disableDragDnd,
  );
  const task = tasks.find((task) => task?.id === content?.id);
  const milestoneCompleted = task?.milestones?.filter(
    (ms: any) => ms?.milestoneCompleted === true,
  ).length;
  const percentage =
    milestoneCompleted && task?.milestones.length > 0
      ? Math.round((milestoneCompleted / task?.milestones?.length) * 100)
      : 0;

  let textareaRef = useClickOutside(() => {
    setEdit(false);
    setEditText(content?.content);
  });

  let selectedTask = task?.id === taskId;

  const editHanlder = (e: SyntheticEvent) => {
    e.preventDefault();
    editText?.length === 0 || editText.length > 50
      ? setEditText(content?.content)
      : dispatch(
          editTask({
            userUid: user,
            taskId: content?.id,
            allTasks: tasks,
            newTask: editText,
          }),
        );

    setEdit(false);
    setTimeout(() => {
      dispatch(getTasks({ userUid: user }));
    }, 150);
  };

  const completionHandler = () => {
    dispatch(
      completedTask({
        userUid: user,
        taskId: content.id,
        allTasks: tasks,
      }),
    );
    setCompleteAnimation(true);

    setTimeout(() => {
      dispatch(completeTaskLocally({ taskId: content?.id }));
      setCompleteAnimation(false);
    }, 300);
  };

  const deletionHandler = () => {
    if (!disableSwiper || task?.locked) return;
    dispatch(
      removeTask({
        userUid: user,
        taskId: content?.id,
        allTasks: tasks,
      }),
    );

    setDeleteAnimation(true);
    setTimeout(() => {
      dispatch(deleteTask({ taskId: content?.id }));
      setDeleteAnimation(false);
    }, 250);
  };

  const importantStateHandler = () => {
    dispatch(
      changeTaskImportantState({
        taskId: content?.id,
        userUid: user,
        allTasks: tasks,
      }),
    );

    dispatch(changeTaskImportantStateLocally({ taskId: content.id }));
  };

  const lockTaskHandler = () => {
    dispatch(
      lockTask({
        userUid: user,
        taskId: content?.id,
        allTasks: tasks,
      }),
    );

    dispatch(lockTaskLocally({ taskId: content.id }));
  };

  return (
    <Draggable
      key={content?.id}
      draggableId={content?.id}
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
            content?.important && !content.completed
              ? 'border-[1px] border-yellow-400'
              : content?.completed
              ? ''
              : `border-[1px] ${setCardColorByTypeHandler(false, content)}`
          }


          
          ${
            content?.completed
              ? 'bg-red-400'
              : setCardColorByTypeHandler(true, content)
          }  rounded text-sm ease-in-out 
            ${
              deleteAnimation
                ? 'translate-x-[-35rem] transition-all duration-300 ease-in-out'
                : ''
            } ${completeAnimation ? 'animate-bounce' : ''} `}
            >
              <div
                className={`flex flex-col justify-between my-0 px-3  py-2 min-h-[10rem]  ${
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
                    fill={content?.important ? '#e8b923' : 'none'}
                    className={`${
                      content?.important ? 'text-yellow-300' : ''
                    } ${task?.completed ? 'invisible' : 'visible'}`}
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
                        className={`textAreaNoResize my-1 p-1 pb-5 outline-none w-full text-sm shadow-sm sm:text-base border-gray-300 rounded-md placeholder-slate-400`}
                        onChange={(e) => setEditText(e.target.value)}
                        value={editText}
                        ref={inputRef}
                        rows={3}
                      />
                      <button className="text-xs bg-opacity-30 text-white bg-black border-[1px] py-2 px-4  rounded self-center mt-2 tracking-wider font-semibold w-fit transition-all ease-in-out whitespace-nowrap">
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
                          content?.completed ? 'strike opacity-60' : ''
                        }`}
                      >
                        <div className="self-start w-full ">
                          <span
                            onClick={() =>
                              content?.completed ? null : setEdit(true)
                            }
                            className="wrapWord"
                          >
                            {content?.content}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center ml-[.31rem]">
                  <div
                    className={` h-[2rem] w-fit flex items-center ${
                      edit ? 'hidden' : 'flex'
                    }`}
                  >
                    {content?.completed ? (
                      <MdOutlineRemoveDone
                        title="Incomplete"
                        type="button"
                        onClick={completionHandler}
                        className="cursor-pointer mr-5 scale-[1.8] transition-all ease-in-out"
                      />
                    ) : (
                      <GoCheck
                        title="Complete task"
                        type="button"
                        onClick={completionHandler}
                        className="cursor-pointer  mr-5 scale-[1.8] transition-all ease-in-out"
                      />
                    )}
                  </div>

                  <div className={`mr-[1.15rem] ${edit ? 'hidden' : ''}`}>
                    <TaskTypeMenu isVertical={false} task={content} />
                  </div>

                  {task?.locked ? (
                    <HiLockClosed
                      title="lock task"
                      type="button"
                      onClick={lockTaskHandler}
                      size={20}
                    />
                  ) : (
                    <HiLockOpen
                      title="lock task"
                      type="button"
                      onClick={lockTaskHandler}
                      size={20}
                    />
                  )}
                </div>
              </div>
              <Link href={`/tasks/${content?.id}`}>
                {task && task?.milestones?.length > 0 ? (
                  <div className=" w-[25%] flex flex-col items-center justify-center  bg-[#64f5c56c] rounded-tr rounded-br">
                    <div className="scale-[.8]">
                      <ProgressBar percentage={percentage} />
                    </div>
                    <div className="flex items-center mt-1">
                      <h1>{milestoneCompleted}</h1>
                      <span className="scale-[.80]">/</span>
                      <span>{content?.milestones.length}</span>
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

export default SingleTaskMobile;
