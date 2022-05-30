import React from "react";
import SingleTask from "./SingleTask";
import { useAppSelector } from "../interfaces/interfaces";
import { RootState } from "../interfaces/interfaces";

const CompletedTasks = () => {
  const todos: { id: string; content: string; completed: boolean }[] =
    useAppSelector((state: RootState) => state.getTodoReducer.todos);
  return (
    <div className="m-10 flex flex-col items-center">
      <h1 className="mb-5 mt-5 md:mt-0">Completed Tasks</h1>
      <div className="w-fit">
        {todos?.map((todo) =>
          todo.completed ? <SingleTask key={todo?.id} content={todo} /> : false,
        )}
      </div>
    </div>
  );
};

export default CompletedTasks;
