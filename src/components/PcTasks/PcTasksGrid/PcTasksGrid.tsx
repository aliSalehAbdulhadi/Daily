import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import dynamic from 'next/dynamic';
import {
  RootState,
  SingleTaskInterface,
  useAppSelector,
} from '../../../interfaces/interfaces';
import { UserKey } from '../../../utilities/globalImports';
import LoadingCard from '../../loadingCard/LoadingCard';
import ErrorMessage from '../../errorMessage/ErrorMessage';
const SingleTaskContainer = dynamic(
  () => import('../../SingleTaskContainer/SingleTaskContainer'),
  {
    suspense: true,
  },
);
const PcTasksGrid = ({
  tasks,
  completedTask,
  pendingTasks,
  completedTasks,
  setTaskId,
  taskId,
}: {
  tasks: SingleTaskInterface[];
  completedTask: boolean;
  pendingTasks: SingleTaskInterface[];
  completedTasks: SingleTaskInterface[];
  setTaskId: Dispatch<SetStateAction<string>>;
  taskId: string;
}) => {
  const [loadInView, setLoadInView] = useState<number>(10);

  const scrollRefTop = useRef<HTMLDivElement>(null);
  const user = UserKey();

  const sortBy = useAppSelector(
    (state: RootState) => state.sortTaskReducer.sortTask,
  );
  const isAddingTask = useAppSelector(
    (state: RootState) => state.getTaskReducer.isAddingTask,
  );

  useEffect(() => {
    setLoadInView(10);
    scrollRefTop?.current?.scrollTo({
      top: 0,
    });
  }, [completedTask]);

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
    <div>
      <div
        ref={scrollRefTop}
        className={`relative  scrollBar overflow-x-hidden w-full   ${
          user ? 'h-[83.4vh] overflow-auto ' : 'overflow-hidden'
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
                  (task: SingleTaskInterface, index: number) => (
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
                  ),
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
                (task: SingleTaskInterface, index: number) => (
                  // eslint-disable-next-line react/jsx-no-undef
                  <div
                    key={task?.id}
                    className="mr-2 h-fit w-[17rem] md:w-[21rem] lg:w-[17.7rem]"
                    onClick={() => setTaskId(task.id)}
                  >
                    <Suspense fallback={<LoadingCard />}>
                      <SingleTaskContainer
                        task={task}
                        index={index}
                        taskId={taskId}
                        setLoadInView={setLoadInView}
                        loadInView={loadInView}
                      />
                    </Suspense>
                  </div>
                ),
              )}
            </SortableContext>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PcTasksGrid;
