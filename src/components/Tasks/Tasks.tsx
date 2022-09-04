import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import {
  useAppSelector,
  SingleTaskInterface,
} from '../../interfaces/interfaces';
import { RootState } from '../../interfaces/interfaces';
import SingleTaskContainer from '../SingleTaskContainer/SingleTaskContainer';

const Tasks = ({ id }: { id: any }) => {
  const [completedTask, setCompletedTask] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>('');
  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );

  useEffect(() => {
    id(taskId);
  }, [taskId, id]);

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
              } semiSm:h-[65vh] min-h-[80vh] semiSm:min-h-[65vh] w-[100%] semiSm:overflow-auto p-5 lg:p-10 scrollBar flex flex-col items-center semiSm:rounded py-6`}
            >
              {completedTask
                ? tasks?.map((task: SingleTaskInterface, index: number) =>
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
                : tasks?.map((task: SingleTaskInterface, index: number) =>
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
