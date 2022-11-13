import React, { SetStateAction, useState } from 'react';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import { sortMilestonesBy } from '../../../redux/slices/features/sortMilestonesSlice';
import useClickOutside from '../../../hooks/useClickOutside';
import { BiSortAlt2 } from 'react-icons/bi';

const SortMilestoneModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const sortModalRef = useClickOutside(() => {
    setOpen(false);
  });
  const sortedBy = useAppSelector(
    (state: RootState) => state.sortMilestonesReducer.sortMilestones,
  );

  const milestonesSortTitleHandler = () => {
    if (sortedBy === 'newMilestones') {
      return 'Latest Milestones';
    } else if (sortedBy === 'oldMilestones') {
      return 'Oldest Milestones';
    } else if (sortedBy === 'completedMilestones') {
      return 'Pending Milestones';
    } else return '';
  };
  return (
    <div
      className="relative select-none cursor-pointer w-fit z-[50]"
      ref={sortModalRef}
    >
      <div

        className={` text-white border-[1px] px-2 md:px-3 py-[0.40rem] rounded  flex  transition-all semiSm:hover:bg-white semiSm:hover:text-secondaryColor whitespace-nowrap absolute top-[-1.2rem] w-[150px] semiSm:${

          open ? 'w-[190px]' : 'w-fit'
        } md:w-[190px] ${
          open ? 'h-[10.5rem] bg-white text-secondaryColor' : ''
        }`}
        onClick={() => setOpen(!open)}
      >
        <BiSortAlt2 className="mb-1 mr-1" size={18} />

        <h1 className="semiSm:mt-[.15rem] semiSm:hidden md:block">
          By {milestonesSortTitleHandler()}{' '}
        </h1>
      </div>
      <div
        className={`absolute top-3 semiSm:top-5 w-[150px]  semiSm:${
          open ? 'w-[190px]' : 'w-fit'
        } md:w-[190px] `}
      >
        <div
          className={`${
            open ? 'flex' : 'hidden'
          } flex-col items-start justify-center  semiSm:py-1 whitespace-nowrap   font-cerealNormal text-xs scale-90 semiSm:scale-100  text-textLight`}
        >
          <button
            onClick={() => {
              dispatch(sortMilestonesBy('newMilestones'));
              setOpen(false);
            }}
            className="w-full semiSm:my-1 semiSm:mb-0 mb-1 py-3 semiSm:py-2 px-4 hover:bg-gray-100"
            type="submit"
          >
            Latest Milestones
          </button>
          <button
            onClick={() => {
              dispatch(sortMilestonesBy('oldMilestones'));
              setOpen(false);
            }}
            type="submit"
            className="w-full my-1 py-3 semiSm:py-2 px-4 hover:bg-gray-100"
          >
            Oldest Milestones
          </button>
          <button
            onClick={() => {
              dispatch(sortMilestonesBy('completedMilestones'));
              setOpen(false);
            }}
            type="submit"
            className="w-full my-1 py-3 semiSm:py-2 px-4 hover:bg-gray-100"
          >
            Pending Milestones
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortMilestoneModal;
