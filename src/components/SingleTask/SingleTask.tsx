import { SyntheticEvent } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { GoCheck } from 'react-icons/go';
import { MdModeEditOutline, MdEditOff } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import { useState, useEffect, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
  SingleTodoInterface,
} from '../../interfaces/interfaces';
import { completedTodo } from '../../redux/slices/features/completeTodo';
import { removeTodo } from '../../redux/slices/features/deleteTodoSlice';
import {
  deleteTodo,
  getTodo,
  updateTodo,
} from '../../redux/slices/features/getTodoSlice';
import { editTodo } from '../../redux/slices/features/editTodo';
import CardIcon from './CardIcon';
import useClickOutside from '../../hooks/useClickOutside';
import moment from 'moment';

const SingleTask = (content: {
  content: SingleTodoInterface;
  index: number;
}) => {
  const [deleteAnimation, setDeleteAnimation] = useState<boolean>(false);
  const [CompleteAnimation, setCompleteAnimation] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(content.content.content);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const todos: SingleTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  useEffect(() => {
    inputRef?.current?.focus();
  }, [edit]);

  const formatDate = moment(content.content.date).format('MMMM Do YYYY');

  let textareaRef = useClickOutside(() => {
    setEdit(false);
    setEditText(content.content.content);
  });

  const editHanlder = (e: SyntheticEvent) => {
    e.preventDefault();
    editText?.length === 0
      ? setEditText(content.content.content)
      : dispatch(
          editTodo({
            userUid: user,
            todoId: content.content.id,
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
        todoId: content.content.id,
        allTodos: todos,
      }),
    );

    setDeleteAnimation(true);
    setTimeout(() => {
      dispatch(deleteTodo({ todoId: content.content.id }));
      setDeleteAnimation(false);
    }, 300);
  };

  const completionHandler = () => {
    dispatch(
      completedTodo({
        userUid: user,
        todoId: content.content.id,
        allTodos: todos,
      }),
    );
    setCompleteAnimation(true);

    setTimeout(() => {
      dispatch(updateTodo({ todoId: content.content.id }));
      setCompleteAnimation(false);
    }, 300);
  };

  const setCardColorByTypeHandler = () => {
    if (content.content.icon === 'personal') {
      return 'bg-green-400';
    }
    if (content.content.icon === 'work') {
      return 'bg-blue-400';
    }
    if (content.content.icon === 'fun') {
      return 'bg-purple-400';
    }
  };

  return (
    <Draggable
      key={content.content.id}
      draggableId={content.content.id}
      index={content.index}
    >
      {(provided) => (
        <div
          className={`text-textLight hover:scale-[1.01]
           hover:transition-all hover:ease-in-out hover:duration-300 font-Comfortaa font-semibold my-2 px-5 py-2 min-h-[10rem] relative ${
             content.content.completed
               ? 'bg-red-400 shadow-2xl'
               : setCardColorByTypeHandler()
           } flex flex-col justify-between lg:flex-row items-center rounded text-sm lg:text-base  ease-in-out
            ${
              deleteAnimation
                ? 'translate-x-[-35rem] transition-all ease-in-out'
                : ''
            } ${CompleteAnimation ? 'animate-bounce' : ''} `}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="mb-3 lg:mb-0">
            <CardIcon
              icon={content?.content?.icon}
              completed={content.content.completed}
            />
          </div>
          {edit ? (
            <form
              ref={textareaRef}
              onSubmit={editHanlder}
              className="flex flex-col"
            >
              <textarea
                className={`my-1 p-1 lg:ml-5 lg:p-2 outline-none w-full text-sm shadow-sm sm:text-base border-gray-300 rounded-md placeholder-slate-400`}
                onChange={(e) => setEditText(e.target.value)}
                value={editText}
                ref={inputRef}
                rows={
                  editText.length >= 100
                    ? editText.length / 50
                    : editText.length / 10
                }
              />
              <button className="lg:ml-10 mb-5 mt-1 lg:mb-0 bg-primaryColor py-2 text-xs rounded w-[50%] self-center text-white transition-all ease-in-out whitespace-nowrap">
                Submit
              </button>
            </form>
          ) : content.content.completed ? (
            <div className="lg:pl-10 mb-3 lg:mb-0 flex flex-col items-center whitespace-pre-wrap">
              <s className="opacity-60">{content.content.content}</s>
              <div className="text-xs absolute top-3 left-[20px] lg:bottom-2 w-fit whitespace-nowrap select-none">
                {formatDate}
              </div>
            </div>
          ) : (
            <div className="lg:pl-10 mb-3 lg:mb-0 flex flex-col items-center">
              <span>{content.content.content}</span>
              <div className="text-xs absolute top-5 left-[20px] lg:bottom-2 w-fit whitespace-nowrap  select-none">
                {formatDate}
              </div>
            </div>
          )}
          <div className="flex lg:flex-col lg:pl-10">
            {content.content.completed ? (
              <IoCloseSharp
                title="Remove from completed tasks"
                type="button"
                onClick={completionHandler}
                className="cursor-pointer mb-3 mr-2 scale-[1.8] md:scale-[1.3] hover:text-white hover:scale-150 transition-all ease-in-out"
              />
            ) : (
              <GoCheck
                title="Complete task"
                type="button"
                onClick={completionHandler}
                className="cursor-pointer mb-3 mr-2 scale-[1.8] md:scale-[1.2] hover:text-white hover:scale-150 transition-all ease-in-out"
              />
            )}

            {!edit ? (
              <MdModeEditOutline
                title="Edit"
                type="submit"
                onClick={() => setEdit(true)}
                className={`cursor-pointer mb-3 mr-2 scale-[1.8] md:scale-[1.2] ${
                  content.content.completed
                    ? 'hidden'
                    : 'block hover:text-white hover:scale-150 transition-all ease-in-out ml-2 lg:ml-0'
                }`}
              />
            ) : (
              <MdEditOff
                type="submit"
                onClick={() => setEdit(false)}
                className={`cursor-pointer mb-3 mr-2 scale-[1.8] md:scale-[1.2] ${
                  content.content.completed
                    ? 'hidden'
                    : 'block hover:text-white hover:scale-150 transition-all ease-in-out ml-2 lg:ml-0'
                }`}
              />
            )}

            <AiFillDelete
              title="Delete"
              type="button"
              onClick={deletionHandler}
              className="cursor-pointer  scale-[1.8] md:scale-[1.2] hover:text-white hover:scale-150 transition-all ease-in-out ml-3 lg:ml-0 "
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTask;
