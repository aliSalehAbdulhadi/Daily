import { memo, Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  rectSortingStrategy,
  verticalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
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

const SingleTaskContainer = dynamic(
  () => import('../SingleTaskContainer/SingleTaskContainer'),
  {
    suspense: true,
  },
);

const MobileTasks = () => {
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
    if (completedTasks?.length <= 0) {
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
    <div className="flex flex-col justify-center  font-Comfortaa font-bold w-full rounded-t">
      <div
        className={` w-full flex item-center justify-between sticky  top-0 z-[40]  transition-all px-5 py-5 shadow-md
            ${dark ? 'bg-secondaryColor ' : 'bg-primaryColor'}  ${
          tasks?.length > 0 ? 'flex' : 'hidden'
        }  items-center justify-between w-full`}
      >
        <div className=" self-start select-none cursor-pointer">
          <div className={`absolute z-[100] top-2 left-5`}>
            <SortModal open={sortModal} setOpen={setSortModal} />
          </div>
        </div>
        <div className="text-white self-center text-xs mr-2 select-none">
          {completedTask ? (
            <span>Total tasks: {CompletedTasks()?.length}</span>
          ) : (
            <span>Total tasks: {PendingTasks()?.length}</span>
          )}
        </div>
      </div>
      <div
        ref={scrollRefTop}
        className={`relative  pb-1 ${tasks?.length === 0 ? 'rounded-t' : ''} ${
          user ? 'h-[61.5vh] overflow-auto' : ''
        } ${
          dark ? 'bg-secondaryColor semiSm:bg-primaryColor' : 'bg-primaryColor'
        }`}
      >
        <div
          ref={scrollRefTop}
          className={`w-[100%] overflow-x-hidden  semiSm:h-[67vh] px-5 py-3 semiSm:py-2 overflow-auto scrollBar flex flex-col items-center  `}
        >
          <SortableContext
            items={completedTasks}
            strategy={rectSortingStrategy}
          >
            {user ? (
              completedTask && tasks?.length > 0 ? (
                taskSortHandler(completedTasks)?.map(
                  (task: SingleTaskInterface, index: number) =>
                    index <= loadInView ? (
                      <Suspense key={task?.id} fallback={<LoadingCard />}>
                        <div
                          className="w-full"
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
                )
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
          </SortableContext>

          <SortableContext
            items={pendingTasks}
            strategy={verticalListSortingStrategy}
          >
            {!completedTask && tasks && tasks?.length > 0
              ? taskSortHandler(pendingTasks)?.map(
                  (task: SingleTaskInterface, index: number) =>
                    index <= loadInView ? (
                      <Suspense key={task?.id} fallback={<LoadingCard />}>
                        <div
                          className="w-full"
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
                )
              : null}
          </SortableContext>
        </div>
      </div>

      {/* mobile switch buttons */}
      <div
        className={`flex items-center  justify-center cursor-pointer absolute bottom-0 py-[0.70rem] z-[40] w-full semiSm:hidden border-t-[1px]  ${
          tasks?.length > 0 ? 'block' : 'hidden'
        } ${dark ? 'bg-secondaryColor' : 'bg-primaryColor'}`}
      >
        <button
          type="button"
          title="Pending tasks"
          onClick={() => setCompletedTask(false)}
          className={`text-textDark  select-none py-3 px-7 rounded-tl rounded-bl text-sm semiSm:text-base whitespace-nowrap ${
            completedTask
              ? dark
                ? 'bg-primaryColor text-white'
                : 'bg-secondaryLight text-white'
              : ' bg-white text-primaryColor'
          }`}
        >
          Pending Tasks
        </button>
        <button
          type="button"
          title="Finished tasks"
          onClick={() => setCompletedTask(true)}
          className={`text-textDark  select-none py-3 px-5 rounded-tr rounded-br text-sm semiSm:text-base whitespace-nowrap ${
            completedTask
              ? 'bg-white text-primaryColor'
              : dark
              ? 'bg-primaryColor text-white'
              : 'bg-secondaryLight text-white'
          }`}
        >
          Finished Tasks
        </button>
      </div>
    </div>
  );
};

export default memo(MobileTasks);
