import { memo, Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import {
  useAppSelector,
  SingleTaskInterface,
} from '../../interfaces/interfaces';
import { RootState } from '../../interfaces/interfaces';
import SortModal from '../modals/SortModal/SortModal';
import ErrorMessage from '../errorMessage/ErrorMessage';
import {
  UserKey,
  Tasks as allTasks,
  Dark,
  PendingTasks,
  CompletedTasks,
} from '../../utilities/globalImports';
import LoadingCard from '../loadingCard/LoadingCard';
import PcSwitchButtons from './PcSwitchButtons/PcSwitchButtons';
import PcTasksChart from './PcTasksChart/PcTasksChart';

const SingleTaskContainer = dynamic(
  () => import('../SingleTaskContainer/SingleTaskContainer'),
  {
    suspense: true,
  },
);

const PcTasks = ({ id }: { id: Function }) => {
  const [completedTask, setCompletedTask] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>('');
  const [sortModal, setSortModal] = useState<boolean>(false);
  const [loadInView, setLoadInView] = useState<number>(10);

  const tasks: SingleTaskInterface[] = allTasks();
  const dark = Dark();

  const sortBy = useAppSelector(
    (state: RootState) => state.sortTaskReducer.sortTask,
  );
  const isAddingTask = useAppSelector(
    (state: RootState) => state.getTaskReducer.isAddingTask,
  );
  const user = UserKey();

  const scrollRefTop = useRef<HTMLDivElement>(null);

  const completedTasks = CompletedTasks() ? [...CompletedTasks()] : [];
  const pendingTasks = PendingTasks() ? [...PendingTasks()] : [];

  useEffect(() => {
    setLoadInView(10);
    scrollRefTop?.current?.scrollTo({
      top: 0,
    });
  }, [completedTask]);

  useEffect(() => {
    id(taskId);
  }, [taskId, id]);

  useEffect(() => {
    if (tasks?.length <= 0) {
      setTaskId('');
    }
  }, [tasks]);

  useEffect(() => {
    if (completedTasks.length <= 0) {
      setCompletedTask(false);
    }
  }, [completedTasks?.length, tasks?.length]);

  useEffect(() => {
    if (sortBy !== 'oldTasks') {
      scrollRefTop?.current?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    if (sortBy === 'oldTasks') {
      scrollRefTop?.current?.scrollTo({
        top: 10000,
        behavior: 'smooth',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddingTask]);

  const taskSortHandler = (tasks: SingleTaskInterface[]) => {
    if (sortBy === 'newTasks') {
      const sortedTasks = tasks?.sort(
        (a: any, b: any) => +new Date(b.date) - +new Date(a.date),
      );

      return sortedTasks;
    } else if (sortBy === 'oldTasks') {
      const sortedTasks = tasks?.sort(
        (a: any, b: any) => +new Date(a.date) - +new Date(b.date),
      );

      return sortedTasks;
    } else if (sortBy === 'importantTasks') {
      const sortedTasks = tasks?.sort(
        (a: any, b: any) => Number(b?.important) - Number(a?.important),
      );

      return sortedTasks;
    } else return tasks;
  };

  return (
    <div className="">
      <div className="self-start flex  bg-primaryColor shadow-md">
        <PcSwitchButtons
          completedTask={completedTask}
          setCompletedTask={setCompletedTask}
        />
        <div className="ml-5 h-full">
          <SortModal open={sortModal} setOpen={setSortModal} />
        </div>
      </div>
      <div className="flex font-Comfortaa font-bold ml-5">
        <div
          ref={scrollRefTop}
          className={`relative  scrollBar overflow-x-hidden pb-1 w-[85%]  ${
            user ? 'h-[83.4vh] overflow-auto rounded-b' : 'overflow-hidden'
          } `}
        >
          <div
            ref={scrollRefTop}
            className={`w-[100%] py-2 scrollBar flex justify-center flex-wrap `}
          >
            {user ? (
              completedTask && tasks?.length > 0 ? (
                <SortableContext
                  items={completedTasks}
                  strategy={rectSortingStrategy}
                >
                  {taskSortHandler(completedTasks)?.map(
                    (task: SingleTaskInterface, index: number) =>
                      index <= loadInView ? (
                        <Suspense key={task?.id} fallback={<LoadingCard />}>
                          <div
                            className="mr-2 h-fit w-[18rem]"
                            onClick={() => setTaskId(task.id)}
                          >
                            <SingleTaskContainer
                              task={task}
                              index={index}
                              taskId={taskId}
                              setLoadInView={setLoadInView}
                              loadInView={loadInView}
                            />
                          </div>
                        </Suspense>
                      ) : null,
                  )}
                </SortableContext>
              ) : (
                <div
                  className={`${
                    tasks?.length <= 0 ? 'block' : 'hidden'
                  }  mt-[7rem]`}
                >
                  <ErrorMessage
                    message="There are no tasks to display."
                    type="noTasks"
                  />
                </div>
              )
            ) : (
              <div className="mt-[7rem]">
                <ErrorMessage
                  message="Please login to start adding tasks."
                  type="noUser"
                  imageLink="/images/wavy.png"
                  imageAlt="Photo of a girl sitting on a hourglass and there is a man standing next to it"
                />
              </div>
            )}

            {!completedTask && tasks && tasks?.length > 0 ? (
              <SortableContext
                items={pendingTasks}
                strategy={rectSortingStrategy}
              >
                {taskSortHandler(pendingTasks)?.map(
                  (task: SingleTaskInterface, index: number) =>
                    index <= loadInView ? (
                      <Suspense key={task?.id} fallback={<LoadingCard />}>
                        <div
                          className="mr-2 h-fit w-[19rem] md:w-[23rem] lg:w-[17.7rem]"
                          onClick={() => setTaskId(task.id)}
                        >
                          <SingleTaskContainer
                            task={task}
                            index={index}
                            taskId={taskId}
                            setLoadInView={setLoadInView}
                            loadInView={loadInView}
                          />
                        </div>
                      </Suspense>
                    ) : null,
                )}
              </SortableContext>
            ) : null}
          </div>
        </div>
        <div className="w-[25%] self-center ml-1">
          <PcTasksChart />
        </div>
      </div>
    </div>
  );
};

export default memo(PcTasks);
