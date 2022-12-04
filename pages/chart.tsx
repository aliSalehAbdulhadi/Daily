import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import FallBackLoading from '../src/components/fallBackLoading/FallBackLoading';
import {
  RootState,
  SingleTaskInterface,
  useAppSelector,
} from '../src/interfaces/interfaces';
import { Dark } from '../src/utilities/globalImports';

const TasksChart = dynamic(
  () => import('../src/components/PcTasks/TasksChart/TasksChart'),
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

  return (
    <div
      className={`flex flex-col w-full h-[90vh] ${
        dark ? 'bg-secondaryColor' : 'bg-secondaryLight'
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

export default Chart;
