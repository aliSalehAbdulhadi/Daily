import React, { SetStateAction } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import useClickOutside from '../../../hooks/useClickOutside';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import { sortTaskBy } from '../../../redux/slices/features/sortTasksSlice';

const SortModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const sortBy = useAppSelector(
    (state: RootState) => state.sortTaskReducer.sortTask,
  );
  const dispatch = useAppDispatch();

  const sortModalRef = useClickOutside(() => {
    setOpen(false);
  });

  const taskSortTitleHandler = () => {
    if (sortBy === 'newTasks') {
      return 'Latest Tasks';
    } else if (sortBy === 'oldTasks') {
      return 'Oldest Tasks';
    } else if (sortBy === 'importantTasks') {
      return 'Important Tasks';
    } else return '';
  };

  return (
    <div
      ref={sortModalRef}
      className={` text-white border-[1px] semiSm:w-fit  inner-shadow py-[.40rem] mt-[0.05rem] rounded flex flex-col items-center  semiSm:hover:bg-white semiSm:hover:text-secondaryColor whitespace-nowrap ${
        !open ? ' px-2' : ''
      } ${open ? 'text-secondaryColor bg-white' : ''}`}
      onClick={() => setOpen(!open)}
    >
      <div className="w-full flex items-center justify-center mr-2 py-[0.10rem]">
        <BiSortAlt2 className="mr-1 " size={18} />

        <h1 className="text-[.70rem] semiSm:text-xs mt-[0.17rem]">
          {sortBy ? 'By' : 'Sort by'} {taskSortTitleHandler()}
        </h1>
      </div>
      <div
        className={`mx-10 transition-all ${
          open ? 'flex' : 'hidden'
        } flex-col items-start justify-start  mt-3 w-full bg-white  font-cerealNormal text-xs text-textLight`}
      >
        <button
          onClick={() => {
            dispatch(sortTaskBy('newTasks'));
            setOpen(false);
          }}
          className="w-full my-1 py-2  hover:bg-gray-100"
          type="submit"
        >
          Latest Tasks
        </button>
        <button
          onClick={() => {
            dispatch(sortTaskBy('oldTasks'));
            setOpen(false);
          }}
          type="submit"
          className="w-full my-1 py-2  hover:bg-gray-100"
        >
          Oldest Tasks
        </button>
        <button
          onClick={() => {
            dispatch(sortTaskBy('importantTasks'));
            setOpen(false);
          }}
          className="w-full my-1 py-2  hover:bg-gray-100"
          type="submit"
        >
          Important Tasks
        </button>
      </div>
    </div>
  );
};

export default SortModal;
