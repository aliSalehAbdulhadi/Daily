import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { GoCheck } from "react-icons/go";
import { MdModeEditOutline } from "react-icons/md";

const SingeTask = () => {
  return (
    <div className="my-5 px-5 py-2 md:p-10 min-h-[5vh] bg-taskColor flex flex-col md:flex-row items-center rounded-tl-md rounded-br-md text-sm md:text-base">
      <div className="mb-3 md:mb-0">Icon</div>
      <h1 className="md:pl-10 mb-3 md:mb-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </h1>
      <div className="flex md:pl-10 ">
        <AiFillDelete className="cursor-pointer mb-3 mr-1 scale-[1.2]" />
        <MdModeEditOutline className="cursor-pointer mb-3 ml-3 scale-[1.2]" />
        <GoCheck className="cursor-pointer ml-3 scale-[1.2]" />
      </div>
    </div>
  );
};

export default SingeTask;
