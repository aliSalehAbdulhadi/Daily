import React from "react";
import SingeTask from "./SingeTask";

const CompletedTasks = () => {
  return (
    <div className="m-10 flex flex-col items-center">
      <h1 className="mb-5 mt-5 md:mt-0">Completed Tasks</h1>
      <div className="w-fit">
        <SingeTask />
       
      </div>
    </div>
  );
};

export default CompletedTasks;
