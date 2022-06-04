import React from "react";
import {
  RootState,
  useAppSelector,
  SingeTodoInterface,
} from "../../interfaces/interfaces";
import CompletedTasks from "./../CompletedTasks/CompletedTasks";
import NewTasks from "./../NewTasks/NewTasks";

const TasksContainer = () => {
  const todos: SingeTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);

  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );

  return (
    <div
      className={`${
        dark ? "bg-primaryColor" : "bg-primaryLight"
      }  w-[100%] md:p-10 md:pt-[5rem] min-h-[90vh] pb-10`}
    >
      {todos?.length > 0 ? (
        <div
          className={`${
            dark ? "bg-secondaryColor" : "bg-secondaryLight"
          } mx-1 md:flex justify-around rounded-md transition-all ease-in-out h-[100%] pt-2`}
        >
          <NewTasks /> <CompletedTasks />
        </div>
      ) : (
        <div
          className={`font-Comfortaa mt-10 md:mt-0 self-center p-10 rounded-md text-center mx-10 ${
            user ? "block" : "hidden"
          }`}
        >
          No added tasks yet.
        </div>
      )}
    </div>
  );
};

export default TasksContainer;
