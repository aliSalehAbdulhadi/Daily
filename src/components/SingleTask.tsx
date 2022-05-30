import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { GoCheck } from "react-icons/go";
import { MdModeEditOutline } from "react-icons/md";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../interfaces/interfaces";
import { completedTodo } from "../redux/slices/features/completeTodo";
import { removeTodo } from "../redux/slices/features/deleteTodoSlice";
import { getTodo } from "../redux/slices/features/getTodoSlice";
const SingeTask = (content: {
  content: {
    content: string;
    id: string;
    completed: boolean;
  };
}) => {
  const dispatch = useAppDispatch();
  const todos: { id: string; content: string; completed: boolean }[] =
    useAppSelector((state: RootState) => state.getTodoReducer.todos);
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);

  return (
    <div
      className={`my-5 px-5 py-2 md:p-10 min-h-[5vh] ${
        content.content.completed ? "bg-red-400" : "bg-green-400"
      } flex flex-col justify-between md:flex-row items-center rounded-tl-md rounded-br-md text-sm md:text-base`}
    >
      <div className="mb-3 md:mb-0">Icon</div>
      {content.content.completed ? (
        <s className="md:pl-10 mb-3 md:mb-0">{content.content.content}</s>
      ) : (
        <span className="md:pl-10 mb-3 md:mb-0">{content.content.content}</span>
      )}
      <div className="flex md:pl-10 ">
        <AiFillDelete
          onClick={() => {
            dispatch(
              removeTodo({
                userUid: user,
                todoId: content.content.id,
                allTodos: todos,
              }),
            );
            dispatch(getTodo({ userUid: user }));
          }}
          className="cursor-pointer mb-3 mr-1 scale-[1.2]"
        />
        <MdModeEditOutline className="cursor-pointer mb-3 ml-3 scale-[1.2]" />
        <GoCheck
          onClick={() => {
            dispatch(
              completedTodo({
                userUid: user,
                todoId: content.content.id,
                allTodos: todos,
              }),
            );
            dispatch(getTodo({ userUid: user }));
          }}
          className="cursor-pointer ml-3 scale-[1.2]"
        />
      </div>
    </div>
  );
};

export default SingeTask;
