import React, { SetStateAction } from 'react';
import { useAppDispatch } from '../../../interfaces/interfaces';
import { sortTaskBy } from '../../../redux/slices/features/sortTasksSlice';

const SortModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${
        open ? 'flex' : 'hidden'
      } flex-col items-start justify-start  py-1 w-[200px]  shadow-inner rounded-xl bg-white  font-cerealNormal text-xs text-textLight`}
    >
      <button
        onClick={() => {
          dispatch(sortTaskBy('newTasks'));
          setOpen(false);
        }}
        className="w-full my-1 py-2 px-4 hover:bg-gray-100"
      >
        Latest Tasks
      </button>
      <button
        onClick={() => {
          dispatch(sortTaskBy('oldTasks'));
          setOpen(false);
        }}
        className="w-full my-1 py-2 px-4 hover:bg-gray-100"
      >
        Oldest Tasks
      </button>
      <button
        onClick={() => {
          dispatch(sortTaskBy('importantTasks'));
          setOpen(false);
        }}
        className="w-full my-1 py-2 px-4 hover:bg-gray-100"
      >
        Important Tasks
      </button>
    </div>
  );
};

export default SortModal;
