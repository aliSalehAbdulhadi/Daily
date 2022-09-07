import { spawn } from 'child_process';
import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { BiSortAlt2 } from 'react-icons/bi';
import useClickOutside from '../../hooks/useClickOutside';
import {
  useAppSelector,
  SingleTaskInterface,
} from '../../interfaces/interfaces';
import { RootState } from '../../interfaces/interfaces';
import SortModal from '../modals/SortModal/SortModal';
import SingleTaskContainer from '../SingleTaskContainer/SingleTaskContainer';

const Tasks = ({ id }: { id: Function }) => {
  const [completedTask, setCompletedTask] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>('');
  const [sortModal, setSortModal] = useState<boolean>(false);

  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  const sortBy = useAppSelector(
    (state: RootState) => state.sortTaskReducer.sortTask,
  );
  const sortModalRef = useClickOutside(() => {
    setSortModal(false);
  });

  useEffect(() => {
    id(taskId);
  }, [taskId, id]);

  useEffect(() => {
    if (tasks?.length <= 0) {
      setTaskId('');
    }
  }, [tasks]);
  const copyTasks = tasks ? [...tasks] : [];
  const completedTasks = tasks ? tasks?.filter((task) => task.completed) : [];
  const pendingTasks = tasks ? tasks?.filter((task) => !task.completed) : [];

  const taskSortHandler = () => {
    if (sortBy === 'newTasks') {
      const sortedTasks = copyTasks?.sort(
        (a: any, b: any) => +new Date(b.date) - +new Date(a.date),
      );

      return sortedTasks;
    } else if (sortBy === 'oldTasks') {
      const sortedTasks = copyTasks?.sort(
        (a: any, b: any) => +new Date(a.date) - +new Date(b.date),
      );

      return sortedTasks;
    } else if (sortBy === 'importantTasks') {
      const sortedTasks = copyTasks?.sort(
        (a: any, b: any) => Number(b?.important) - Number(a?.important),
      );

      return sortedTasks;
    } else return tasks;
  };

  const taskSortTitleHandler = () => {
    if (sortBy === 'newTasks') {
      return 'Latest Tasks';
    } else if (sortBy === 'oldTasks') {
      return 'Oldest Tasks';
    } else if (sortBy === 'importantTasks') {
      return 'Important Tasks';
    } else return '';
  };

  return (
    <div className="flex justify-center">
      <Droppable droppableId="NewTasks">
        {(provided) => (
          <div
            className="sm:m-10 flex flex-col items-center font-Comfortaa font-bold  w-full"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="items-center justify-center cursor-pointer hidden semiSm:flex">
              <button
                onClick={() => setCompletedTask(false)}
                className={`text-textDark mb-5 select-none py-3 px-7 rounded-tl rounded-bl text-sm semiSm:text-base whitespace-nowrap ${
                  completedTask
                    ? 'bg-primaryColor text-white'
                    : ' bg-white text-primaryColor'
                }`}
              >
                Pending Tasks
              </button>
              <button
                onClick={() => setCompletedTask(true)}
                className={`text-textDark mb-5 select-none py-3 px-5 rounded-tr rounded-br text-sm semiSm:text-base whitespace-nowrap ${
                  completedTask
                    ? 'bg-white text-primaryColor'
                    : ' bg-primaryColor text-white'
                }`}
              >
                Finished Tasks
              </button>
            </div>
            <div
              className={`${
                dark
                  ? 'bg-primaryColor'
                  : 'bg-secondaryLight semiSm:bg-primaryColor'
              } semiSm:h-[65vh] min-h-[80vh] semiSm:min-h-[65vh] w-[100%] semiSm:overflow-auto p-5 semiSm:px-10 semiSm:py-8  scrollBar flex flex-col items-center semiSm:rounded py-6 `}
            >
              <div
                className={`${
                  tasks?.length > 0 ? 'flex' : 'hidden'
                }  items-center justify-between w-full`}
              >
                <div
                  className="relative self-start select-none cursor-pointer "
                  ref={sortModalRef}
                >
                  <div
                    className="mb-5 ml-1 semiSm:ml-0 text-white border-[1px] px-3 py-2 rounded  flex items-center transition-all semiSm:hover:bg-white semiSm:hover:text-secondaryColor"
                    onClick={() => setSortModal(!sortModal)}
                  >
                    <BiSortAlt2 className="mb-1" size={18} />
                    <h1 className="text-[.70rem] semiSm:text-xs">
                      {sortBy ? 'Sorted by' : 'Sort by'}{' '}
                      {taskSortTitleHandler()}
                    </h1>
                  </div>
                  <div className={`absolute z-[100] top-12 left-0 `}>
                    <SortModal open={sortModal} setOpen={setSortModal} />
                  </div>
                </div>
                <div className="text-white self-center mb-5 semiSm:mb-0 text-xs mr-1 semiSm:mr-0">
                  {completedTask ? (
                    <span>Total tasks: {completedTasks?.length}</span>
                  ) : (
                    <span>Total tasks: {pendingTasks?.length}</span>
                  )}
                </div>
              </div>
              {tasks?.length > 0 ? (
                completedTask ? (
                  taskSortHandler()?.map(
                    (task: SingleTaskInterface, index: number) =>
                      task.completed ? (
                        <div
                          key={task?.id}
                          className="w-full"
                          onClick={() => setTaskId(task.id)}
                        >
                          <SingleTaskContainer
                            content={task}
                            index={index}
                            taskId={taskId}
                          />
                        </div>
                      ) : null,
                  )
                ) : (
                  taskSortHandler()?.map(
                    (task: SingleTaskInterface, index: number) =>
                      !task?.completed ? (
                        <div
                          key={task?.id}
                          className="w-full"
                          onClick={() => setTaskId(task.id)}
                        >
                          <SingleTaskContainer
                            content={task}
                            index={index}
                            taskId={taskId}
                          />
                        </div>
                      ) : null,
                  )
                )
              ) : (
                <span className="text-white mt-[5rem]">
                  There are no tasks to display
                </span>
              )}
            </div>
            <div className="flex items-center justify-center cursor-pointer sticky bottom-0 z-50 bg-secondaryColor w-full p-5 semiSm:hidden">
              <div>
                <button
                  onClick={() => setCompletedTask(false)}
                  className={`text-textDark  select-none py-3 px-7 rounded-tl rounded-bl text-sm semiSm:text-base whitespace-nowrap ${
                    completedTask
                      ? 'bg-primaryColor text-white'
                      : ' bg-white text-primaryColor'
                  }`}
                >
                  Pending Tasks
                </button>
                <button
                  onClick={() => setCompletedTask(true)}
                  className={`text-textDark  select-none py-3 px-5 rounded-tr rounded-br text-sm semiSm:text-base whitespace-nowrap ${
                    completedTask
                      ? 'bg-white text-primaryColor'
                      : ' bg-primaryColor text-white'
                  }`}
                >
                  Finished Tasks
                </button>
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Tasks;
