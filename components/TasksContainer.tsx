import React from "react";
import CompletedTasks from "./CompletedTasks";
import NewTasks from "./NewTasks";

const TasksContainer = () => {
  return (
    <div className="w-screen pt-[5rem]  h-[90vh] bg-primaryColor">
      <div className="mx-10  bg-secondaryColor flex justify-around">
        <NewTasks />
        <CompletedTasks />
      </div>
    </div>
  );
};

export default TasksContainer;
