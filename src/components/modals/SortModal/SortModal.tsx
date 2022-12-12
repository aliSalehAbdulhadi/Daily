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
      className={`select-none cursor-pointer text-white  rounded semiSm:rounded-none  semiSm:border-0  inner-shadow flex flex-col items-center justify-center  semiSm:hover:bg-white semiSm:hover:text-secondaryColor whitespace-nowrap semiSm:transition-all h-full w-full text-[.70rem]  ${
        open ? 'text-secondaryColor bg-white ' : ' '
      }`}
      onClick={() => setOpen(!open)}
    >
      <div
        className={` relative justify-center  flex   items-center py-1 xs:py-2 semiSm:py-0 px-3 mt-1 semiSm:mt-0   ${
          sortBy || open ? 'min-w-[8rem]' : ' min-w-[5rem] semiSm:min-w-[6rem]'
        } ${
          open ? '' : 'border-[1px] rounded semiSm:border-0 semiSm:rounded-none'
        }`}
      >
        <div className="flex z-40">
          <BiSortAlt2 className={`mr-1 `} size={18} />

          <h1 className=" semiSm:text-xs w-full mt-[0.17rem]">
            {sortBy ? 'By' : 'Sort by'} {taskSortTitleHandler()}
          </h1>
        </div>
        <div
          className={` transition-all rounded-b  w-full absolute bg-white top-4 pt-4 pb-1  ${
            open ? 'flex' : 'hidden'
          } flex-col items-start justify-start  bg-white  font-cerealNormal text-xs text-textLight`}
        >
          <button
            onClick={() => {
              dispatch(sortTaskBy('newTasks'));
              setOpen(false);
            }}
            className="w-full my-1 py-2 hover:bg-gray-100"
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
    </div>
  );
};

export default SortModal;
