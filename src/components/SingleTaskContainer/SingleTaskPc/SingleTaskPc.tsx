import { SyntheticEvent } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { GoCheck } from 'react-icons/go';
import {
  MdModeEditOutline,
  MdEditOff,
  MdOutlineRemoveDone,
} from 'react-icons/md';
import { BiX } from 'react-icons/bi';
import { useState, useEffect, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import {
  RootState,
  useAppDispatch,
  useAppSelector,
  SingleTaskInterface,
} from '../../../interfaces/interfaces';
import { completedTask } from '../../../redux/slices/features/completeTaskSlice';
import { removeTask } from '../../../redux/slices/features/deleteTaskSlice';
import {
  changeTaskImportantStateLocally,
  deleteTask,
  getTasks,
  completeTaskLocally,
} from '../../../redux/slices/features/getTasksSlice';
import { editTask } from '../../../redux/slices/features/editTaskSlice';
import useClickOutside from '../../../hooks/useClickOutside';
import TaskTypeMenu from '../../Forms/TaskForm/TaskTypeMenu';
import { changeTaskImportantState } from '../../../redux/slices/features/changeTaskImportantStateSlice';
import { HiOutlineStar } from 'react-icons/hi';
import { setCardColorByTypeHandler } from '../../../utilities/setColorByTypeHandler';

const SingleTaskPc = ({
  content,
  index,
  taskId,
}: {
  content: SingleTaskInterface;
  index: number;
  taskId: string;
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

  let textareaRef = useClickOutside(() => {
    setEdit(false);
    setEditText(content?.content);
  });

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

  const deletionHandler = () => {
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

  const completionHandler = () => {
    dispatch(
      completedTask({
        userUid: user,
        taskId: content?.id,
        allTasks: tasks,
      }),
    );
    setCompleteAnimation(true);

    setTimeout(() => {
      dispatch(completeTaskLocally({ taskId: content?.id }));
      setCompleteAnimation(false);
    }, 300);
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

  return (
    <Draggable key={content?.id} draggableId={content?.id} index={index}>
      {(provided) => (
        <div
          className={`text-textLight  outline-[1px] ${
            content.important ? 'outline-[1px] outline outline-yellow-400' : ''
          }
           hover:transition-transform hover:ease-in-out hover:duration-300 font-Comfortaa font-semibold my-2 px-5 py-2 min-h-[10rem] relative ${
             content?.completed
               ? 'bg-red-400 shadow-2xl'
               : setCardColorByTypeHandler(true, content)
           } flex flex-col justify-center items-center rounded ease-in-out
            ${
              deleteAnimation
                ? 'translate-x-[-35rem] transition-all ease-in-out'
                : ''
            } ${completeAnimation ? 'animate-bounce' : ''} `}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            className={`${
              edit ? 'hidden' : 'flex'
            } items-center justify-between w-full mb-2  `}
          >
            <div className="text-xs w-fit whitespace-nowrap select-none">
              {formatDate}
            </div>
            <div className={`${content.completed ? 'hidden' : 'block'} `}>
              <HiOutlineStar
                onClick={importantStateHandler}
                size={20}
                fill={content.important ? '#e8b923' : 'none'}
                className={`transition-all hover:fill-[#e8b923] hover:text-yellow-300 ${
                  content.important ? 'text-yellow-300' : ''
                } mr-[.6rem] cursor-pointer`}
              />
            </div>
          </div>
          <div className="flex items-center w-full ">
            <div
              className={`px-2 ${
                edit ? 'hidden' : 'block'
              } w-[5%]  z-50 cursor-pointer`}
            >
              <TaskTypeMenu isVertical={true} task={content} />
            </div>

            {edit ? (
              <form
                ref={textareaRef}
                onSubmit={editHanlder}
                className="flex flex-col items-center justify-center w-full relative"
              >
                <textarea
                  className={`textAreaNoResize  my-1 pb-0 ml-5 p-2 outline-none w-[60%] shadow-sm border-gray-300 rounded-md placeholder-slate-400`}
                  onChange={(e) => setEditText(e.target.value)}
                  value={editText}
                  ref={inputRef}
                  rows={3}
                />
                <button className=" text-xs bg-opacity-30 text-white bg-black self-start  border-[1px] py-1 px-3  rounded ml-[7.5rem] mt-1 tracking-wider font-semibold transition-all ease-in-out whitespace-nowrap ">
                  Submit
                </button>
                <span
                  className={`absolute top-16 right-28 text-[.65rem] ${
                    editText.length > 50 ? 'text-red-500' : ''
                  }`}
                >
                  {editText.length}/50
                </span>
              </form>
            ) : (
              <div className="w-full ml-5">
                <div
                  className={` flex-col items-center flex ${
                    content?.completed ? 'strike opacity-60' : ''
                  }`}
                >
                  <div>
                    <span className="wrapWord">{content?.content}</span>
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
                  className="cursor-pointer mb-2 mr-2 hover:text-white transition-all ease-in-out"
                />
              ) : (
                <GoCheck
                  title="Complete task"
                  type="button"
                  onClick={completionHandler}
                  size={21}
                  className="cursor-pointer mb-2 mr-2 hover:text-white transition-all ease-in-out"
                />
              )}

              {!edit ? (
                <MdModeEditOutline
                  title="Edit"
                  type="submit"
                  onClick={() => setEdit(true)}
                  size={20}
                  className={`cursor-pointer mb-2 mr-2 ${
                    content?.completed
                      ? 'invisible'
                      : 'visible hover:text-white transition-all ease-in-ou'
                  }`}
                />
              ) : (
                <MdEditOff
                  type="submit"
                  onClick={() => setEdit(false)}
                  size={20}
                  className={`cursor-pointer mb-2 mr-2 ${
                    content?.completed
                      ? 'invisible'
                      : 'visible hover:text-white transition-all ease-in-out'
                  }`}
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
                <AiFillDelete
                  title="Delete"
                  type="submit"
                  onClick={() => setDeleteTimer(true)}
                  className="cursor-pointer scale-[1.3]  h-[1.35rem] hover:text-white hover:scale-150 transition-all ease-in-out"
                />
              )}
            </div>
          </div>

          {content?.id === taskId ? (
            <div>
              <div className="selectedTask pointer-events-none bg-white h-[7rem] w-[1px] text-transparent  absolute top-[50%] translate-y-[-50%] left-[-15px]">
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
