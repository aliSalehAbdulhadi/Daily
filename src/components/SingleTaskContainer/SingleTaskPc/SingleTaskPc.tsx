import { SyntheticEvent } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { GoCheck } from 'react-icons/go';
import { MdModeEditOutline, MdEditOff } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import { useState, useEffect, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
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

const SingleTaskPc = ({
  content,
  index,
  taskId,
}: {
  content: SingleTodoInterface;
  index: number;
  taskId: string;
}) => {
  const [deleteAnimation, setDeleteAnimation] = useState<boolean>(false);
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
          className={`text-textLight ${
            content.id === taskId ? 'borderTop borderBottom' : ''
          } 
           hover:transition-transform hover:ease-in-out hover:duration-300 font-Comfortaa font-semibold my-2 px-5 py-2 min-h-[10rem] relative ${
             content.completed
               ? 'bg-red-400 shadow-2xl'
               : setCardColorByTypeHandler()
           } flex justify-between flex-row items-center rounded ease-in-out
            ${
              deleteAnimation
                ? 'translate-x-[-35rem] transition-all ease-in-out'
                : ''
            } ${completeAnimation ? 'animate-bounce' : ''} `}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="mb-0">
            <TaskCardIcons icon={content?.icon} completed={content.completed} />
          </div>
          {edit ? (
            <form
              ref={textareaRef}
              onSubmit={editHanlder}
              className="flex flex-col"
            >
              <textarea
                className={`my-1 pb-0 ml-5 p-2 outline-none w-full shadow-sm border-gray-300 rounded-md placeholder-slate-400`}
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
            <div className="w-full">
              <div
                className={`pl-10  flex-col items-center flex ${
                  content.completed ? 'strike opacity-60' : ''
                }`}
              >
                <div>
                  <span>{content.content}</span>
                  <div className="text-xs absolute top-5 left-[20px] bottom-2 w-fit whitespace-nowrap  select-none">
                    {formatDate}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className={` flex flex-col pl-10`}>
            {content.completed ? (
              <IoCloseSharp
                title="Remove from completed tasks"
                type="button"
                onClick={completionHandler}
                className="cursor-pointer mb-3 mr-2 scale-[1.3] hover:text-white hover:scale-150 transition-all ease-in-out"
              />
            ) : (
              <GoCheck
                title="Complete task"
                type="button"
                onClick={completionHandler}
                className="cursor-pointer mb-3 mr-2 scale-[1.2] hover:text-white hover:scale-150 transition-all ease-in-out"
              />
            )}

            {!edit ? (
              <MdModeEditOutline
                title="Edit"
                type="submit"
                onClick={() => setEdit(true)}
                className={`cursor-pointer mb-3 mr-2 scale-[1.2] ${
                  content.completed
                    ? 'hidden'
                    : 'block hover:text-white hover:scale-150 transition-all ease-in-ou'
                }`}
              />
            ) : (
              <MdEditOff
                type="submit"
                onClick={() => setEdit(false)}
                className={`cursor-pointer mb-3 mr-2 scale-[1.2] ${
                  content.completed
                    ? 'hidden'
                    : 'block hover:text-white hover:scale-150 transition-all ease-in-out'
                }`}
              />
            )}

            <AiFillDelete
              title="Delete"
              type="submit"
              onClick={deletionHandler}
              className="cursor-pointer scale-[1.2] hover:text-white hover:scale-150 transition-all ease-in-out"
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTaskPc;
