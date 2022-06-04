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

const SingleTask = (content: {
  content: {
    id: string;
    content: string;
    completed: boolean;
    icon: string;
  };
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

  return (
    <Draggable draggableId={content.content.id} index={content.index}>
      {(provided, snapshot) => (
        <div
          className={`hover:scale-[1.05] font-Comfortaa font-semibold my-5 px-5 py-2 min-h-[20vh] md:p-10 min-w-[65vw] md:min-h-[17vh] md:min-w-[30vw] md:max-w-[30vw] ${
            content.content.completed
              ? "bg-red-400 shadow-2xl"
              : "bg-green-400 shadow-2xl"
          } ${
            snapshot.isDragging && !content.content.completed
              ? "bg-green-500"
              : ""
          } ${
            snapshot.isDragging && content.content.completed ? "bg-red-600" : ""
          }  flex flex-col justify-between md:flex-row items-center rounded-md text-sm md:text-base transition-all ease-out duration-300 ${
            deleteAnimation ? "translate-x-[-35rem]" : ""
          } ${CompleteAnimation ? "animate-bounce" : ""} `}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="mb-3 md:mb-0">
            <CardIcon icon={content?.content?.icon} />
          </div>
          {edit ? (
            <form ref={textareaRef} onSubmit={editHanlder}>
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
            </form>
          ) : content.content.completed ? (
            <s className="md:pl-10 mb-3 md:mb-0">{content.content.content}</s>
          ) : (
            <span className="md:pl-10 mb-3 md:mb-0">
              {content.content.content}
            </span>
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
