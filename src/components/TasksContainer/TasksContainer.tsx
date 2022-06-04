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

  return (
    <div className="w-[100%] pt-1 md:pt-[5rem] min-h-[90vh] bg-primaryColor pb-10">
      {todos?.length > 0 ? (
        <div className="mx-10 bg-[#2c5252]  md:flex justify-around rounded-md transition-all ease-in-out">
          <NewTasks /> <CompletedTasks />{" "}
        </div>
      ) : (
        <div
          className={`text-white font-Comfortaa mt-10 md:mt-0 self-center p-10 rounded-md text-center mx-10  bg-secondaryColor ${
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
