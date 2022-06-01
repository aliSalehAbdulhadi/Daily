import React, { SyntheticEvent } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GoCheck } from "react-icons/go";
import { MdModeEditOutline } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../interfaces/interfaces";
import { completedTodo } from "../../redux/slices/features/completeTodo";
import { removeTodo } from "../../redux/slices/features/deleteTodoSlice";
import { getTodo } from "../../redux/slices/features/getTodoSlice";
import { editTodo } from "../../redux/slices/features/editTodo";

const SingleTask = (content: {
  content: {
    id: string;
    content: string;
    completed: boolean;
  };
  index: number;
}) => {
  const [deleteAnimation, setDeleteAnimation] = useState<boolean>(false);
  const [CompleteAnimation, setCompleteAnimation] = useState<boolean>(false);

  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(content.content.content);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const todos: { id: string; content: string; completed: boolean }[] =
    useAppSelector((state: RootState) => state.getTodoReducer.todos);
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  useEffect(() => {
    inputRef?.current?.focus();
  }, [edit]);

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
    }, 50);
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
      setDeleteAnimation(false);
    }, 1000);
    setTimeout(() => {
      dispatch(getTodo({ userUid: user }));
    }, 50);
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
      setCompleteAnimation(false);
    }, 1000);
    setTimeout(() => {
      dispatch(getTodo({ userUid: user }));
    }, 200);
  };
  return (
    <Draggable draggableId={content.content.id} index={content.index}>
      {(provided, snapshot) => (
        <div
          className={`my-5 px-5 py-2 min-h-[20vh] md:p-10 min-w-[65vw] md:min-h-[15vh] md:min-w-[30vw] md:max-w-[30vw] ${
            content.content.completed
              ? "bg-red-400 shadow-2xl"
              : "bg-green-400 shadow-2xl"
          } ${
            snapshot.isDragging && !content.content.completed
              ? "bg-green-500"
              : ""
          } ${
            snapshot.isDragging && content.content.completed ? "bg-red-600" : ""
          } flex flex-col justify-between md:flex-row items-center rounded-md text-sm md:text-base transition-all ease-out duration-300 ${
            deleteAnimation ? "translate-x-[-35rem]" : ""
          } ${CompleteAnimation ? "animate-bounce" : ""} `}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="mb-3 md:mb-0">Icon</div>
          {edit ? (
            <form onSubmit={editHanlder}>
              <input
                className={`my-1 p-1 md:ml-5 md:p-2 outline-none w-full text-sm shadow-sm sm:text-base border-gray-300 rounded-md placeholder-slate-400 `}
                ref={inputRef}
                onChange={(e) => setEditText(e.target.value)}
                type="text"
                value={editText}
              />
            </form>
          ) : content.content.completed ? (
            <s className="md:pl-10 mb-3 md:mb-0">{content.content.content}</s>
          ) : (
            <span className="md:pl-10 mb-3 md:mb-0">
              {content.content.content}
            </span>
          )}
          <div className="flex md:pl-10 ">
            <AiFillDelete
              onClick={deletionHandler}
              className="cursor-pointer mb-3 mr-1 scale-[1.2] hover:text-white hover:scale-150 transition-all ease-in-out "
            />
            <MdModeEditOutline
              onClick={() => setEdit(!edit)}
              className={`cursor-pointer mb-3 ml-3 scale-[1.2] ${
                content.content.completed
                  ? "hidden"
                  : "block hover:text-white hover:scale-150 transition-all ease-in-out"
              }`}
            />
            <GoCheck
              onClick={completionHandler}
              className="cursor-pointer ml-3 scale-[1.2] hover:text-white hover:scale-150 transition-all ease-in-out "
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTask;
