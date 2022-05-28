import React from "react";
import SingeTask from "./SingeTask";

const NewTasks = () => {
  return (
    <div className="m-10 flex flex-col items-center">
      <h1 className="mb-5 mt-5 md:mt-0">New Tasks</h1>
      <div className="w-fit">
        <SingeTask />
        <SingeTask />
        <SingeTask />
      </div>
    </div>
  );
};

export default NewTasks;
