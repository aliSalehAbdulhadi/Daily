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
  const vh = window?.innerHeight;
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
    <div className="flex flex-col justify-center  font-Comfortaa font-bold w-full rounded-t ">
      <div
        className={` w-full flex item-center justify-between sticky  top-0 z-[40]  transition-all px-2 xs:px-5 py-4 xs:py-5 shadow-md
            ${dark ? 'bg-secondaryColor ' : 'bg-primaryColor'}  ${
          tasks?.length > 0 ? 'flex' : 'hidden'
        }  items-center justify-between w-full`}
      >
        <div className=" self-start select-none cursor-pointer">
          <div className={`absolute z-[100] top-1 xs:top-2 left-2 xs:left-5`}>
            <SortModal open={sortModal} setOpen={setSortModal} />
          </div>
        </div>
        <div className="text-white self-center text-[.70rem] xs:text-xs xs:mt-1 mr-2 select-none">
          {completedTask ? (
            <span>Total tasks: {CompletedTasks()?.length}</span>
          ) : (
            <span>Total tasks: {PendingTasks()?.length}</span>
          )}
        </div>
      </div>

      <div
        ref={scrollRefTop}
        className={`sm:px-10 semiSm:px-0  pb-1 ${
          tasks?.length === 0 ? 'rounded-t' : ''
        } ${user ? `xs:h-[62vh] h-[57vh]  overflow-auto` : ''} ${
          dark ? 'bg-secondaryColor semiSm:bg-primaryColor' : 'bg-primaryColor'
        }`}
      >
        <div
          ref={scrollRefTop}
          className={`w-[100%] overflow-x-hidden   px-2 xs:px-5 py-3 semiSm:py-2 overflow-auto scrollBar flex flex-col items-center  `}
        >
          <SortableContext
            items={completedTasks}
            strategy={rectSortingStrategy}
          >
            {user ? (
              !completedTask && pendingTasks?.length > 0 ? (
                taskSortHandler(pendingTasks)?.map(
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
                    pendingTasks?.length <= 0 && !completedTask
                      ? 'block'
                      : 'hidden'
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
            {completedTask && completedTasks?.length > 0 ? (
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
                className={`${completedTask ? 'block' : 'hidden'}  mt-[7rem]`}
              >
                <ErrorMessage
                  message="There are no tasks to display."
                  type="noTasks"
                />
              </div>
            )}
          </SortableContext>
        </div>
      </div>

      {/* mobile switch buttons */}
      <div
        className={`flex items-center  justify-center cursor-pointer fixed bottom-0    w-full  border-t-[1px] border-white border-opacity-20   ${
          dark ? 'bg-secondaryColor' : 'bg-primaryColor'
        } ${user && tasks?.length > 0 ? '' : 'hidden'} `}
      >
        <button
          type="button"
          title="Pending tasks"
          onClick={() => setCompletedTask(false)}
          className={`text-textDark  select-none w-[45%] xs:w-[40%] rounded-l  my-1 text-xs  xs:text-sm  whitespace-nowrap ${
            vh > 480 ? 'h-[3rem]' : 'h-[2.5rem]'
          } ${
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
          className={`text-textDark  select-none  w-[45%] xs:w-[40%] rounded-r  my-1 text-xs xs:text-sm  whitespace-nowrap ${
            vh > 480 ? 'h-[3rem]' : 'h-[2.5rem]'
          } ${
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
