import dynamic from 'next/dynamic';
import React, { Suspense, memo } from 'react';
import FallBackLoading from '../src/components/fallBackLoading/FallBackLoading';
import useWindowSize from '../src/hooks/useWindowsSize';
import {
  RootState,
  SingleTaskInterface,
  useAppSelector,
} from '../src/interfaces/interfaces';
import { Dark, UserKey } from '../src/utilities/globalImports';
import NotFoundPage from './404';

const TasksChart = dynamic(
  () => import('../src/components/TasksContainer/TasksChart/TasksChart'),
  {
    suspense: true,
  },
);
const Chart = () => {
  const tasks = useAppSelector(
    (state: RootState) => state?.getTaskReducer?.tasks,
  );
  const pendingTasks = tasks?.filter(
    (task: SingleTaskInterface) => !task?.completed,
  );

  const completedTasks = tasks?.filter(
    (task: SingleTaskInterface) => task?.completed,
  );
  const dark = Dark();
  const user = UserKey();

  const vw = useWindowSize();

  if (vw > 839 || !user) return <NotFoundPage />;
  return (
    <div
      className={`flex flex-col w-full xs:h-[90vh] ${
        dark ? 'bg-secondaryColor' : 'bg-primaryColor'
      }`}
    >
      <Suspense fallback={<FallBackLoading />}>
        <TasksChart
          tasks={tasks}
          pendingTasks={pendingTasks}
          completedTasks={completedTasks}
        />
      </Suspense>
    </div>
  );
};

export default memo(Chart);
