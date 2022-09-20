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
  window.addEventListener('load', function () {
    setTimeout(function () {
      // This hides the address bar:
      window.scrollTo(0, 1);
    }, 0);
  });

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

  useEffect(() => {
    setCompletedTask(false);
  }, [tasks?.length]);

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
    <div
      className={`flex flex-col justify-center semiSm:w-[90%]  ${

        dark
          ? 'bg-primaryColor semiSm:bg-secondaryColor'
          : ' bg-primaryLight semiSm:bg-secondaryLight'
      }`}
    >
      <Droppable droppableId="NewTasks">
        {(provided) => (
          <div
            className="flex flex-col semiSm:m-5 font-Comfortaa font-bold  semiSm:h-fit w-full"

            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="items-center justify-center  cursor-pointer hidden semiSm:flex">
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
              className={`relative semiSm:rounded semiSm:h-[75vh] ${

                dark
                  ? 'bg-secondaryColor semiSm:bg-primaryColor'
                  : 'bg-primaryColor'
              }`}
            >
              <div
                className={` w-full flex item-center justify-between shadow-md  semiSm:border-b-[1px] py-3 px-5  ${
                  tasks?.length > 0 ? 'flex' : 'hidden'
                }  items-center justify-between w-full`}
              >
                <div
                  className="relative self-start select-none cursor-pointer "
                  ref={sortModalRef}
                >
                  <div
                    className=" text-white border-[1px] px-3 py-2 rounded  flex items-center transition-all semiSm:hover:bg-white semiSm:hover:text-secondaryColor"
                    onClick={() => setSortModal(!sortModal)}
                  >
                    <BiSortAlt2 className="mb-1 mr-1" size={18} />
                    <h1 className="text-[.70rem] semiSm:text-xs">
                      {sortBy ? 'By' : 'Sort by'} {taskSortTitleHandler()}
                    </h1>
                  </div>
                  <div className={`absolute z-[100] top-12 left-0 `}>
                    <SortModal open={sortModal} setOpen={setSortModal} />
                  </div>
                </div>
                <div className="text-white self-center text-xs mr-2">
                  {completedTask ? (
                    <span>Total tasks: {completedTasks?.length}</span>
                  ) : (
                    <span>Total tasks: {pendingTasks?.length}</span>
                  )}
                </div>
              </div>
              <div
                className={`w-[100%] h-[63vh]  semiSm:h-[67vh] px-5 py-3 semiSm:py-2 overflow-auto scrollBar flex flex-col items-center `}
              >
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
            </div>
            {/* mobile switch buttons */}
            <div
              className={`flex items-center justify-center cursor-pointer absolute bottom-0 z-40 py-3 w-full semiSm:hidden border-t-[1px]  ${
                tasks?.length > 0 ? 'block' : 'hidden'
              } ${dark ? 'bg-secondaryColor' : 'bg-primaryColor'}`}
            >
              <button
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
        )}
      </Droppable>
    </div>
  );
};

export default Tasks;
