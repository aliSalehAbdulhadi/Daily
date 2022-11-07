import React, { SetStateAction } from 'react';
import { useAppDispatch } from '../../../interfaces/interfaces';
import { sortMilestonesBy } from '../../../redux/slices/features/sortMilestonesSlice';

const SortMilestoneModal = ({
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
          dispatch(sortMilestonesBy('newMilestones'));
          setOpen(false);
        }}
        className="w-full my-1 py-2 px-4 hover:bg-gray-100"
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
        className="w-full my-1 py-2 px-4 hover:bg-gray-100"
      >
        Oldest Milestones
      </button>
      <button
        onClick={() => {
          dispatch(sortMilestonesBy('completedMilestones'));
          setOpen(false);
        }}
        type="submit"
        className="w-full my-1 py-2 px-4 hover:bg-gray-100"
      >
        Pending Milestones
      </button>
    </div>
  );
};

export default SortMilestoneModal;
