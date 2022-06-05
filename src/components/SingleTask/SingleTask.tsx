import React, { SyntheticEvent } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GoCheck } from "react-icons/go";
import { MdModeEditOutline, MdEditOff } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
  SingeTodoInterface,
} from "../../interfaces/interfaces";
import { completedTodo } from "../../redux/slices/features/completeTodo";
import { removeTodo } from "../../redux/slices/features/deleteTodoSlice";
import {
  deleteTodo,
  getTodo,
  updateTodo,
} from "../../redux/slices/features/getTodoSlice";
import { editTodo } from "../../redux/slices/features/editTodo";
import CardIcon from "./CardIcon";
import useClickOutside from "../../hooks/useClickOutside";
import moment from "moment";

const SingleTask = (content: {
  content: SingeTodoInterface;
  index: number;
}) => {
  const [deleteAnimation, setDeleteAnimation] = useState<boolean>(false);
  const [CompleteAnimation, setCompleteAnimation] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(content.content.content);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const todos: SingeTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  useEffect(() => {
    inputRef?.current?.focus();
  }, [edit]);

  const formatDate = moment(content.content.date).format("MMMM Do YYYY");

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
    if (content.content.icon === "personal") {
      return "bg-green-400";
    }
    if (content.content.icon === "work") {
      return "bg-blue-400";
    }
    if (content.content.icon === "fun") {
      return "bg-purple-400";
    }
  };

  return (
    <Draggable draggableId={content.content.id} index={content.index}>
      {(provided, snapshot) => (
        <div
          className={`text-textLight hover:scale-105 hover:transition-all hover:ease-in-out hover:duration-300 font-Comfortaa font-semibold my-5 px-5 py-2 min-h-[20vh] md:p-10 min-w-[80vw] md:min-h-[19vh] md:min-w-[30vw] md:max-w-[30vw] relative ${
            content.content.completed
              ? "bg-red-400 shadow-2xl"
              : setCardColorByTypeHandler()
          } ${
            snapshot.isDragging && content.content.completed ? "bg-red-600" : ""
          }  flex flex-col justify-between md:flex-row items-center rounded-md text-sm md:text-base  ease-in-out
            ${deleteAnimation ? "translate-x-[-35rem]" : ""} ${
            CompleteAnimation ? "animate-bounce" : ""
          } `}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="mb-3 md:mb-0">
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
                className={`my-1 p-1 md:ml-5 md:p-2 outline-none w-full text-sm shadow-sm sm:text-base border-gray-300 rounded-md placeholder-slate-400`}
                onChange={(e) => setEditText(e.target.value)}
                value={editText}
                ref={inputRef}
                rows={
                  editText.length >= 100
                    ? editText.length / 50
                    : editText.length / 10
                }
              />
              <button className="md:ml-10 mb-5 mt-1 md:mb-0 bg-primaryColor py-2 text-xs rounded w-[50%] self-center text-white hover:scale-110 transition-all ease-in-out whitespace-nowrap">
                Save Changes
              </button>
            </form>
          ) : content.content.completed ? (
            <div className="md:pl-10 mb-3 md:mb-0 flex flex-col items-center">
              <s className="">{content.content.content}</s>
              <div className="text-xs absolute top-3 left-[20px] md:bottom-2 w-fit whitespace-nowrap">
                {formatDate}
              </div>
            </div>
          ) : (
            <div className="md:pl-10 mb-3 md:mb-0 flex flex-col items-center">
              <span className="">{content.content.content}</span>
              <div className="text-xs absolute top-5 left-[20px] md:bottom-2 w-fit whitespace-nowrap">
                {formatDate}
              </div>
            </div>
          )}
          <div className="flex md:flex-col md:pl-10">
            {content.content.completed ? (
              <IoCloseSharp
                type="button"
                onClick={completionHandler}
                className="cursor-pointer mb-3 mr-6 scale-[1.8] md:scale-[1.3] hover:text-white hover:scale-150 transition-all ease-in-out"
              />
            ) : (
              <GoCheck
                type="button"
                onClick={completionHandler}
                className="cursor-pointer mb-3 mr-6 scale-[1.8] md:scale-[1.2] hover:text-white hover:scale-150 transition-all ease-in-out"
              />
            )}

            {!edit ? (
              <MdModeEditOutline
                type="submit"
                onClick={() => setEdit(true)}
                className={`cursor-pointer mb-3 mr-6 scale-[1.8] md:scale-[1.2] ${
                  content.content.completed
                    ? "hidden"
                    : "block hover:text-white hover:scale-150 transition-all ease-in-out ml-2 md:ml-0"
                }`}
              />
            ) : (
              <MdEditOff
                type="submit"
                onClick={() => setEdit(false)}
                className={`cursor-pointer mb-3 mr-6 scale-[1.8] md:scale-[1.2] ${
                  content.content.completed
                    ? "hidden"
                    : "block hover:text-white hover:scale-150 transition-all ease-in-out ml-2 md:ml-0"
                }`}
              />
            )}

            <AiFillDelete
              type="button"
              onClick={deletionHandler}
              className="cursor-pointer  scale-[1.8] md:scale-[1.2] hover:text-white hover:scale-150 transition-all ease-in-out ml-3 md:ml-0 "
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTask;
