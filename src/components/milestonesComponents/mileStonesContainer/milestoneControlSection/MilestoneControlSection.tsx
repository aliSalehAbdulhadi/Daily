import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { BiX } from 'react-icons/bi';
import { Checkbox } from 'pretty-checkbox-react';
import { TbListCheck } from 'react-icons/tb';
import { MdOutlineDelete } from 'react-icons/md';
import { batch } from 'react-redux';
import {
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../../../interfaces/interfaces';
import { deleteAllFinishedMilestoneLocally } from '../../../../redux/slices/features/getTasksSlice';
import { deleteAllFinishedMilestone } from '../../../../redux/slices/features/fireBaseActions/MilestonesSlice';
import SortMilestoneModal from '../../../modals/sortMilestoneModal/SortMilestoneModal';
import { punctCheckboxAction } from '../../../../redux/slices/features/milestonePunctCheckboxSlice';
import '@djthoms/pretty-checkbox';
import { isOnline } from '../../../../utilities/isOnline';
import { Tasks, UserKey } from '../../../../utilities/globalImports';

const MilestoneControlSection = ({ taskId }: { taskId: any }) => {
  const [sortModal, setSortModal] = useState<boolean>(false);
  const [deleteTimer, setDeleteTimer] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = UserKey();

  const tasks: SingleTaskInterface[] = Tasks();

  const task = tasks?.find((task) => task?.id === taskId);

  const milestoneCompleted = task?.milestones?.filter(
    (ms: any) => ms?.milestoneCompleted === true,
  )?.length;

  const punctCheckbox = useAppSelector(
    (state) => state.milestonePunctCheckboxReducer.milestonePunctCheckbox,
  );

  const deleteAllFinishedMilestonesHandler = () => {
    batch(() => {
      if (isOnline()) {
        dispatch(
          deleteAllFinishedMilestone({
            userUid: user,
            taskId: task?.id,
            allTasks: tasks,
          }),
        );
      }
      dispatch(deleteAllFinishedMilestoneLocally({ taskId: task?.id }));
    });
  };

  return (
    <div className="text-[.6rem] semiSm:text-xs  semiSm:scale-[1] w-full  ">
      <div className="flex items-center justify-between   md:flex-row md:items-center w-full semiSm:mt-4 semiSm:mb-4">
        <div title="Sort Milestones">
          <SortMilestoneModal open={sortModal} setOpen={setSortModal} />
        </div>
        <div className="flex items-center">
          <div className="flex mr-2 mt-1  flex-row items-start">
            <div className="items-center  justify-center hidden semiSm:flex ">
              <h1 className="mr-2">Milestones:</h1>
              <div className="min-w-[1.5rem]">
                <span>{milestoneCompleted}</span>
                <span>/</span>
                <span>{task?.milestones?.length}</span>
              </div>
            </div>

            <div
              title="Punctuate Milestones"
              className="md:ml-5 semiSm:ml-1  flex flex-col xs:flex-row-reverse items-center justify-center  text-xs mr-2 xs:mr-5"
            >
              <label htmlFor="punct">Punct</label>

              <Checkbox
                className="mb-1 mt-1 xs:mt-0"
                bigger
                checked={punctCheckbox}
                onChange={(e) =>
                  dispatch(punctCheckboxAction(e?.target.checked))
                }
                shape="curve"
                variant="thick"
              />
            </div>
          </div>
          <button
            onClick={() => setDeleteTimer(!deleteTimer)}
            title="Delete all finished milestones"
            type="button"
            disabled={task && milestoneCompleted === 0}
            className={`bg-white text-secondaryColor border-[1px]  semiSm:mb-0 px-2 py-1 rounded semiSm:mr-4 flex items-center transition-all  ${
              task && milestoneCompleted === 0 ? 'opacity-60 ' : 'opacity-90'
            } ${
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
                  size={20}
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
              <div className={`relative `}>
                <TbListCheck size={20} />
                <MdOutlineDelete
                  fill="white"
                  className="absolute top-3 right-[-15px] rounded-full bg-red-500 h-5 w-5 p-1 opacity-90"
                />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MilestoneControlSection;
