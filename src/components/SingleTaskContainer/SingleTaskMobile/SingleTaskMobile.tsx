import { SyntheticEvent } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { GoCheck } from 'react-icons/go';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { BiX } from 'react-icons/bi';
import { IoCloseSharp } from 'react-icons/io5';
import { useState, useEffect, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import Link from 'next/link';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
  SingleTodoInterface,
} from '../../../interfaces/interfaces';
import { completedTodo } from '../../../redux/slices/features/completeTodo';
import { removeTodo } from '../../../redux/slices/features/deleteTodoSlice';
import {
  deleteTodo,
  getTodo,
  updateTodo,
} from '../../../redux/slices/features/getTodoSlice';
import { editTodo } from '../../../redux/slices/features/editTodo';
import TaskCardIcons from '../TaskCardIcons/TaskCardIcons';
import useClickOutside from '../../../hooks/useClickOutside';
import ProgressBar from '../../progressBar/ProgressBar';
import { MdOutlineRemoveDone } from 'react-icons/md';

const SingleTaskMobile = ({
  content,
  index,
}: {
  content: SingleTodoInterface;
  index: number;
}) => {
  const [deleteAnimation, setDeleteAnimation] = useState<boolean>(false);
  const [deleteTimer, setDeleteTimer] = useState<boolean>(false);
  const [completeAnimation, setCompleteAnimation] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(content.content);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const todos: SingleTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  useEffect(() => {
    inputRef?.current?.focus();
  }, [edit]);
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  const formatDate = moment(content.date).format('MMM/D/YYYY');

  const todo = todos.find((todo) => todo?.id === content.id);
  const milestoneCompleted = todo?.milestones?.filter(
    (ms: any) => ms?.milestoneCompleted === true,
  ).length;
  const percentage =
    milestoneCompleted && todo.milestones.length > 0
      ? Math.round((milestoneCompleted / todo?.milestones?.length) * 100)
      : 0;

  let textareaRef = useClickOutside(() => {
    setEdit(false);
    setEditText(content.content);
  });

  const editHanlder = (e: SyntheticEvent) => {
    e.preventDefault();
    editText?.length === 0 || editText.length > 50
      ? setEditText(content.content)
      : dispatch(
          editTodo({
            userUid: user,
            todoId: content.id,
            allTodos: todos,
            newTodo: editText,
          }),
        );

    setEdit(false);
    setTimeout(() => {
      dispatch(getTodo({ userUid: user }));
    }, 150);
  };

  const deletionHandler = () => {
    dispatch(
      removeTodo({
        userUid: user,
        todoId: content.id,
        allTodos: todos,
      }),
    );

    setDeleteAnimation(true);
    setTimeout(() => {
      dispatch(deleteTodo({ todoId: content.id }));
      setDeleteAnimation(false);
    }, 300);
  };

  const completionHandler = () => {
    dispatch(
      completedTodo({
        userUid: user,
        todoId: content.id,
        allTodos: todos,
      }),
    );
    setCompleteAnimation(true);

    setTimeout(() => {
      dispatch(updateTodo({ todoId: content.id }));
      setCompleteAnimation(false);
    }, 300);
  };

  const setCardColorByTypeHandler = () => {
    if (content.icon === 'personal') {
      return 'bg-green-400';
    }
    if (content.icon === 'work') {
      return 'bg-blue-400';
    }
    if (content.icon === 'fun') {
      return 'bg-purple-400';
    }
  };

  return (
    <Draggable key={content.id} draggableId={content.id} index={index}>
      {(provided) => (
        <div
          className={`flex mb-2 text-textLight
          font-Comfortaa font-semibold  relative ${
            content.completed
              ? 'bg-red-400 shadow-2xl'
              : setCardColorByTypeHandler()
          }  rounded text-sm ease-in-out
            ${
              deleteAnimation
                ? 'translate-x-[-35rem] transition-all ease-in-out'
                : ''
            } ${completeAnimation ? 'animate-bounce' : ''} `}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex flex-col justify-between my-0 px-5 py-2 min-h-[10rem] w-[75%]">
            <div className="mb-3 ">
              <TaskCardIcons
                icon={content?.icon}
                completed={content.completed}
              />
            </div>
            {edit ? (
              <form
                ref={textareaRef}
                onSubmit={editHanlder}
                className="flex flex-col"
              >
                <textarea
                  className={`my-1 p-1 pb-5 outline-none w-full text-sm shadow-sm sm:text-base border-gray-300 rounded-md placeholder-slate-400`}
                  onChange={(e) => setEditText(e.target.value)}
                  value={editText}
                  ref={inputRef}
                  rows={
                    editText.length >= 100
                      ? editText.length / 50
                      : editText.length / 15
                  }
                />
                <button className="text-sm rounded ml-6 mt-1 animate-pulse tracking-wider font-semibold w-fit transition-all ease-in-out whitespace-nowrap ">
                  Submit
                </button>
              </form>
            ) : (
              <div className="w-full ">
                <div
                  className={`flex w-full  h-full flex-col items-center ${
                    content.completed ? 'strike opacity-60' : ''
                  }`}
                >
                  <div className="self-start w-full">
                    <span
                      onClick={() => (content.completed ? null : setEdit(true))}
                    >
                      {content.content}
                    </span>
                    <div className="text-[.65rem] absolute top-[1.15rem] left-[60px] w-fit whitespace-nowrap select-none">
                      {formatDate}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div
              className={` h-[2rem] w-fit flex items-center ${
                edit ? 'hidden' : 'flex'
              }`}
            >
              {content.completed ? (
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

              {deleteTimer ? (
                <div
                  className="relative cursor-pointer w-fit h-fit"
                  onClick={() => setDeleteTimer(false)}
                >
                  <BiX className="absolute h-4 w-4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
                  <CountdownCircleTimer
                    size={30}
                    strokeWidth={3}
                    isPlaying
                    duration={2}
                    trailColor={content.completed ? '#f87171' : '#4ade80'}
                    colors="#ffff"
                    onComplete={() => {
                      setDeleteTimer(false);
                      deletionHandler();
                      return { shouldRepeat: true };
                    }}
                  />
                </div>
              ) : (
                <AiFillDelete
                  title="Delete"
                  type="submit"
                  onClick={() => setDeleteTimer(true)}
                  className="cursor-pointer scale-[1.8] hover:text-white hover:scale-150 transition-all ease-in-out"
                />
              )}
            </div>
          </div>
          <Link href={`/tasks/${content?.id}`}>
            <div className=" w-[25%] flex flex-col items-center justify-center">
              <div className="scale-[.8]">
                <ProgressBar percentage={percentage} />
              </div>
              <div className="flex items-center">
                <h1 className="font-bold text-[.65rem]">Milestones:</h1>
                <span className="ml-1">{content.milestones.length}</span>
              </div>
            </div>
          </Link>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTaskMobile;
