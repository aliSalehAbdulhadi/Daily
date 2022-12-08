import { memo, Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { BsArrowBarLeft, BsArrowBarRight } from 'react-icons/bs';
import {
  RootState,
  SingleTaskInterface,
  useAppSelector,
} from '../../interfaces/interfaces';
import SortModal from '../modals/SortModal/SortModal';
import {
  Tasks as allTasks,
  PendingTasks,
  CompletedTasks,
  UserKey,
  Dark,
} from '../../utilities/globalImports';
import PcSwitchButtons from './PcSwitchButtons/PcSwitchButtons';
import PcTasksGrid from './PcTasksGrid/PcTasksGrid';
import FallBackLoading from '../fallBackLoading/FallBackLoading';
const MileStone = dynamic(() => import('../mileStone/MileStone'), {
  suspense: true,
});

const PcTasksChart = dynamic(() => import('./TasksChart/TasksChart'), {
  suspense: true,
});

const PcTasks = () => {
  const [completedTask, setCompletedTask] = useState<boolean>(false);

  const [taskId, setTaskId] = useState<string>('');
  const [sortModal, setSortModal] = useState<boolean>(false);
  const [expandPanel, setExpandPanel] = useState<boolean>(false);

  const user = UserKey();
  const tasks: SingleTaskInterface[] = allTasks();
  const completedTasks = CompletedTasks() ? [...CompletedTasks()] : [];
  const pendingTasks = PendingTasks() ? [...PendingTasks()] : [];
  const dark = Dark();

  const openMilestonePanel = useAppSelector(
    (state: RootState) => state?.openMilestonePanelReducer.OpenMilestonePanel,
  );

  useEffect(() => {
    if (tasks?.length <= 0) {
      setTaskId('');
    }
  }, [tasks]);

  useEffect(() => {
    if (completedTasks?.length <= 0) {
      setCompletedTask(false);
    }
  }, [completedTasks?.length, tasks?.length]);

  return (
    <div className="flex w-full">
      <div
        className={`flex flex-col font-Comfortaa font-bold  mobileTaskCardBoxShadow transition-all h-[88.35vh] relative ${
          dark ? 'bg-secondaryColor' : 'bg-primaryColor'
        } ${
          expandPanel || !user
            ? 'w-full'
            : 'w-[65%]  lg:w-[70%] xl:w-[75%] xxl:w-[80%]'
        }`}
      >
        <div
          className={`self-start flex justify-between h-[3rem] shadow-md w-full ${
            user ? '' : 'invisible'
          }`}
        >
          <div
            className={` ${
              openMilestonePanel ? 'hidden' : 'flex '
            } h-full relative`}
          >
            <PcSwitchButtons
              completedTask={completedTask}
              setCompletedTask={setCompletedTask}
            />
            <div
              title="Sort Tasks"
              className="z-40 absolute left-[318px] border-l-[1px] h-full"
            >
              <SortModal open={sortModal} setOpen={setSortModal} />
            </div>
          </div>
          <button
            title="Show/Hide Chart"
            className="self-end flex items-center justify-end w-full h-full"
          >
            <div
              onClick={() => setExpandPanel(!expandPanel)}
              className="hover:bg-textDark text-white hover:text-textLight  px-2 h-full flex items-center justify-center "
            >
              {expandPanel ? (
                <BsArrowBarLeft size={20} />
              ) : (
                <BsArrowBarRight size={20} />
              )}
            </div>
          </button>
        </div>
        {openMilestonePanel ? (
          <Suspense fallback={<FallBackLoading />}>
            <MileStone user={user} tasks={tasks} taskId={taskId} />
          </Suspense>
        ) : (
          <PcTasksGrid
            tasks={tasks}
            pendingTasks={pendingTasks}
            completedTask={completedTask}
            taskId={taskId}
            setTaskId={setTaskId}
            completedTasks={completedTasks}
          />
        )}
      </div>
      <div
        className={`${
          expandPanel || !user
            ? 'hidden'
            : 'w-[35%] lg:w-[30%] xl:w-[25%] xxl:w-[20%]'
        }`}
      >
        <Suspense fallback={<FallBackLoading />}>
          <PcTasksChart
            pendingTasks={pendingTasks}
            completedTasks={completedTasks}
            tasks={tasks}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(PcTasks);
