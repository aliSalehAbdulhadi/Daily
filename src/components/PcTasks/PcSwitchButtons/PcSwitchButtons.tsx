import React, { Dispatch, SetStateAction } from 'react';

const PcSwitchButtons = ({
  completedTask,
  setCompletedTask,
}: {
  completedTask: boolean;
  setCompletedTask: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center justify-center cursor-pointer text-sm">
      <button
        type="button"
        title="Pending tasks"
        onClick={() => setCompletedTask(false)}
        className={`text-textDark select-none py-[.85rem] px-7  whitespace-nowrap ${
          completedTask
            ? 'bg-primaryColor text-white'
            : ' bg-white text-primaryColor'
        }`}
      >
        Pending Tasks
      </button>
      <button
        type="button"
        title="Finished tasks"
        onClick={() => setCompletedTask(true)}
        className={`text-textDark select-none py-[.85rem] px-7  whitespace-nowrap ${
          completedTask
            ? 'bg-white text-primaryColor'
            : ' bg-primaryColor text-white'
        }`}
      >
        Finished Tasks
      </button>
    </div>
  );
};

export default PcSwitchButtons;
