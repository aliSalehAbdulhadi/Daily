import React from "react";
import CompletedTasks from "./CompletedTasks";
import NewTasks from "./NewTasks";

const TasksContainer = () => {
  return (
    <div className="w-[100%] pt-[5rem]  min-h-[90vh] bg-primaryColor">
      <div className="mx-10 bg-secondaryColor md:flex justify-around rounded-tl-md rounded-br-md">
        <NewTasks />
        <CompletedTasks />
      </div>
    </div>
  );
};

export default TasksContainer;
