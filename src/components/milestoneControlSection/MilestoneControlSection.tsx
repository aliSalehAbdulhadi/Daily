import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { BiSortAlt2, BiX } from 'react-icons/bi';

import { CgPlayListRemove } from 'react-icons/cg';
import { Checkbox } from 'pretty-checkbox-react';

import useClickOutside from '../../hooks/useClickOutside';
import {
  RootState,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../interfaces/interfaces';
import { deleteAllFinishedMilestoneLocally } from '../../redux/slices/features/getTasksSlice';
import { deleteAllFinishedMilestone } from '../../redux/slices/features/MilestonesSlice';
import SortMilestoneModal from '../modals/sortMilestoneModal/SortMilestoneModal';
import { punctCheckboxAction } from '../../redux/slices/features/milestonePunctCheckboxSlice';
import '@djthoms/pretty-checkbox';

const MilestoneControlSection = ({ taskId }: { taskId: any }) => {
  const [sortModal, setSortModal] = useState<boolean>(false);
  const [deleteTimer, setDeleteTimer] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const sortModalRef = useClickOutside(() => {
    setSortModal(false);
  });
  const sortMilestonesBy = useAppSelector(
    (state: RootState) => state.sortMilestonesReducer.sortMilestones,
  );
  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );

  const task = tasks?.find((task) => task?.id === taskId);


  const milestoneCompleted = task?.milestones?.filter(
    (ms: any) => ms?.milestoneCompleted === true,
  ).length;

  const punctCheckbox = useAppSelector(
    (state) => state.milestonePunctCheckboxReducer.milestonePunctCheckbox,
  );

  const deleteAllFinishedMilestonesHandler = () => {
    dispatch(
      deleteAllFinishedMilestone({
        userUid: user,
        taskId: task?.id,
        allTasks: tasks,
      }),
    );
    dispatch(deleteAllFinishedMilestoneLocally({ taskId: task?.id }));
  };
  const milestonesSortTitleHandler = () => {
    if (sortMilestonesBy === 'newMilestones') {
      return 'Latest Milestones';
    } else if (sortMilestonesBy === 'oldMilestones') {
      return 'Oldest Milestones';
    } else if (sortMilestonesBy === 'completedMilestones') {
      return 'Completed Milestones';
    } else return '';
  };
  return (
    <div className="text-[.6rem] semiSm:text-xs  semiSm:scale-[1] w-full ">
      <div className="flex items-center justify-between semiSm:flex-col semiSm:justify-between  md:flex-row md:items-center w-full semiSm:mt-5 semiSm:mb-5">

        <div className="flex  semiSm:mb-4 md:mb-0 items-center w-full ">
          <div className="flex items-center justify-between w-[50%]">

            <div
              className="relative select-none cursor-pointer w-fit"
              ref={sortModalRef}
            >
              <div
                className="semiSm:ml-0 text-white mr-4  border-[1px] px-2 md:px-3 py-2 rounded  flex items-center transition-all semiSm:hover:bg-white semiSm:hover:text-secondaryColor"
                onClick={() => setSortModal(!sortModal)}
              >
                <BiSortAlt2 className="mb-1 mr-1" size={18} />

                <h1 className=" ">Sorted by {milestonesSortTitleHandler()} </h1>
              </div>
              <div className={`absolute z-[100] top-12 left-0 `}>
                <SortMilestoneModal open={sortModal} setOpen={setSortModal} />
              </div>
            </div>

            <div className="items-center justify-center hidden semiSm:flex">
              <h1 className="mr-2 ">Milestones Progress:</h1>
              <div>
                <span>{milestoneCompleted}</span>
                <span>/</span>
                <span>{task?.milestones?.length}</span>
              </div>
            </div>
          </div>

          <div className="ml-10 flex flex-row-reverse items-center justify-center mb-1 text-xs">
            <label className="mt-1" htmlFor="punct">
              Punct
            </label>

            <Checkbox
              bigger
              checked={punctCheckbox}
              onChange={(e) => dispatch(punctCheckboxAction(e?.target.checked))}
              shape="curve"
              variant="thick"
            />
          </div>
        </div>

        <button
          onClick={() => setDeleteTimer(!deleteTimer)}
          title="Delete all finished tasks"

          disabled={milestoneCompleted === 0}
          className={`bg-white text-secondaryColor border-[1px] mb-1 semiSm:mb-0 px-2 py-1 rounded semiSm:mr-3 flex items-center transition-all ${
            milestoneCompleted == 0
              ? ''
              : 'semiSm:hover:bg-red-500 semiSm:hover:text-white '
          }`}

        >
          {deleteTimer ? (
            <div
              className="relative cursor-pointer w-fit h-fit self-center"
              onClick={() => setDeleteTimer(false)}
            >
              <BiX className="absolute h-4 w-4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
              <CountdownCircleTimer
                size={25}
                strokeWidth={1.5}
                isPlaying
                duration={3}
                trailColor="#427676"
                colors="#ffff"
                onComplete={() => {
                  setDeleteTimer(false);
                  deleteAllFinishedMilestonesHandler();
                }}
              />
            </div>
          ) : (
            <div>
              <CgPlayListRemove size={25} />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default MilestoneControlSection;
