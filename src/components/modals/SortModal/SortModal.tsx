import { SetStateAction } from 'react';
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
      className={` cursor-pointer text-white  mt-1 semiSm:mt-0 rounded semiSm:rounded-none semiSm:border-l-[1px] semiSm:border-0 semiSm:w-fit w-full  inner-shadow py-2 semiSm:py-0 h-[4.5vh] flex flex-col items-center  semiSm:px-0 semiSm: semiSm:hover:bg-white semiSm:hover:text-secondaryColor whitespace-nowrap semiSm:transition-all ${
        open ? '' : 'border-[1px] px-2'
      }  ${open ? 'text-secondaryColor bg-white' : ''}`}
      onClick={() => setOpen(!open)}
    >
      <div
        className={`w-full  flex items-center mr-2  semiSm:mt-3 semiSm:mb-2 ${
          sortBy || open ? ' justify-center semiSm:w-[10rem]' : ' ml-3 w-[5rem]'
        }`}
      >
        <BiSortAlt2 className="mr-1 " size={18} />

        <h1 className="text-[.70rem] semiSm:text-xs mt-[0.17rem]">
          {sortBy ? 'By' : 'Sort by'} {taskSortTitleHandler()}
        </h1>
      </div>
      <div
        className={` transition-all z-40 px-10 semiSm:px-0 rounded-b w-full ${
          open ? 'flex' : 'hidden'
        } flex-col items-start justify-start  bg-white  font-cerealNormal text-xs text-textLight`}
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
