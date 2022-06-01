import React from "react";
import CompletedTasks from "./../CompletedTasks/CompletedTasks";
import NewTasks from "./../NewTasks/NewTasks";

const TasksContainer = () => {
  return (
    <div className="w-[100%] pt-[5rem]  min-h-[90vh] bg-primaryColor">
      <div className="mx-10 bg-[#2c5252]  md:flex justify-around rounded-md">
        <NewTasks />
        <CompletedTasks />
      </div>
    </div>
  );
};

export default TasksContainer;
