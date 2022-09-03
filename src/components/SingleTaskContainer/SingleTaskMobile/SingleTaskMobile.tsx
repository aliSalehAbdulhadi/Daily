import { SyntheticEvent } from 'react';
import { GoCheck } from 'react-icons/go';
import { MdOutlineRemoveDone } from 'react-icons/md';
import { TbHandClick } from 'react-icons/tb';
import { CgMoveTask } from 'react-icons/cg';
import { IoMdArrowDropright } from 'react-icons/io';
import { BiListPlus, BiListUl } from 'react-icons/bi';
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
import {
  deleteTodo,
  getTodo,
  updateTodo,
} from '../../../redux/slices/features/getTodoSlice';
import { editTodo } from '../../../redux/slices/features/editTodo';
import TaskCardIcons from '../TaskCardIcons/TaskCardIcons';
import useClickOutside from '../../../hooks/useClickOutside';
import ProgressBar from '../../progressBar/ProgressBar';
import Swipeable from '../../swipeable/Swipeable';
import { removeTodo } from '../../../redux/slices/features/deleteTodoSlice';

const SingleTaskMobile = ({
  content,
  index,
}: {
  content: SingleTodoInterface;
  index: number;
}) => {
  const [completeAnimation, setCompleteAnimation] = useState<boolean>(false);
  const [deleteAnimation, setDeleteAnimation] = useState<boolean>(false);

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

  const formatDate = moment(content.date).format('MMM/D/YYYY');
  const disableSwiper = useAppSelector(
    (state: RootState) => state.disableSwiperReducer.disableSwiper,
  );
  const disableDrag = useAppSelector(
    (state: RootState) => state.disableDragReducer.disableDragDnd,
  );
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

  const deletionHandler = () => {
    if (!disableSwiper) return;
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
    }, 250);
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
    <Draggable
      key={content.id}
      draggableId={content.id}
      index={index}
      isDragDisabled={disableDrag}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Swipeable handler={deletionHandler}>
            <div
              className={`taskMobileEnter flex text-textLight
          font-Comfortaa font-semibold  relative ${
            content.completed ? 'bg-red-400' : setCardColorByTypeHandler()
          }  rounded text-sm ease-in-out
            ${
              deleteAnimation
                ? 'translate-x-[-35rem] transition-all duration-300 ease-in-out'
                : ''
            } ${completeAnimation ? 'animate-bounce' : ''} `}
            >
              <div className="flex flex-col justify-between my-0 px-5 py-2 min-h-[10rem] w-[75%] mobileTaskCardBoxShadow">
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
                          onClick={() =>
                            content.completed ? null : setEdit(true)
                          }
                        >
                          {content.content}
                        </span>
                        <div className="text-[.65rem] absolute top-[1rem] left-[60px] w-fit whitespace-nowrap select-none">
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
                </div>
              </div>
              <Link href={`/tasks/${content?.id}`}>
                {todo && todo?.milestones?.length > 0 ? (
                  <div className=" w-[25%] flex flex-col items-center justify-center  bg-[#64f5c56c] rounded-tr rounded-br">
                    <div className="scale-[.8]">
                      <ProgressBar percentage={percentage} />
                    </div>
                    <div className="flex items-center">
                      <h1 className="">{milestoneCompleted}</h1>
                      <span className="scale-[.80]">/</span>
                      <span className="">{content.milestones.length}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-end w-[25%] bg-[#64f5c56c] pr-2">
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
