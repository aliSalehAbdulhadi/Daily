import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import {
  useAppSelector,
  SingleTodoInterface,
} from '../../interfaces/interfaces';
import { RootState } from '../../interfaces/interfaces';
import SingleTaskContainer from '../SingleTaskContainer/SingleTaskContainer';

const Tasks = ({ id }: { id: any }) => {
  const [completedTask, setCompletedTask] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>('');
  const todos: SingleTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );

  useEffect(() => {
    id(taskId);
  }, [taskId, id]);

  return (
    <div className="flex justify-center">
      <Droppable droppableId="NewTodos">
        {(provided) => (
          <div
            className="my-5  sm:m-10 flex flex-col items-center font-Comfortaa font-bold  w-full"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="flex items-center justify-center cursor-pointer">
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
                ? todos?.map((todo: SingleTodoInterface, index: number) =>
                    todo.completed ? (
                      <div
                        key={todo?.id}
                        className="w-full"
                        onClick={() => setTaskId(todo.id)}
                      >
                        <SingleTaskContainer
                          content={todo}
                          index={index}
                          taskId={taskId}
                        />
                      </div>
                    ) : null,
                  )
                : todos?.map((todo: SingleTodoInterface, index: number) =>
                    !todo.completed ? (
                      <div
                        key={todo?.id}
                        className="w-full"
                        onClick={() => setTaskId(todo.id)}
                      >
                        <SingleTaskContainer
                          content={todo}
                          index={index}
                          taskId={taskId}
                        />
                      </div>
                    ) : null,
                  )}
            </div>
            <div className="semiSm:hidden">{provided.placeholder}</div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Tasks;
