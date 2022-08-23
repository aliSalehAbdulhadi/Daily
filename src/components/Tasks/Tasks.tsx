import { Droppable } from 'react-beautiful-dnd';
import SingleTask from '../SingleTask/SingleTask';
import {
  useAppSelector,
  SingleTodoInterface,
} from '../../interfaces/interfaces';
import { RootState } from '../../interfaces/interfaces';
import { useEffect, useState } from 'react';

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
    <div className="flex justify-center h-[80vh] ">
      <Droppable droppableId="NewTodos">
        {(provided) => (
          <div
            className="m-10 flex flex-col items-center   min-h-[25vh] font-Comfortaa font-bold  w-full"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="flex items-center justify-center cursor-pointer">
              <button
                onClick={() => setCompletedTask(false)}
                className={`text-textDark mb-5 mt-5 md:mt-0 select-none py-3 px-7  rounded-tl rounded-bl ${
                  completedTask
                    ? 'bg-primaryColor text-white'
                    : ' bg-white text-primaryColor'
                }`}
              >
                New Tasks
              </button>
              <button
                onClick={() => setCompletedTask(true)}
                className={`text-textDark mb-5 mt-5 md:mt-0 select-none py-3 px-5  rounded-tr rounded-br ${
                  completedTask
                    ? 'bg-white text-primaryColor'
                    : ' bg-primaryColor text-white'
                }`}
              >
                Completed Tasks
              </button>
            </div>
            <div className=" bg-primaryColor h-[80vh] w-[100%] overflow-auto p-5 md:p-10 scrollBar flex flex-col items-center rounded py-6">
              {completedTask
                ? todos?.map((todo: SingleTodoInterface, index: number) =>
                    todo.completed ? (
                      <div key={todo?.id} onClick={() => setTaskId(todo.id)}>
                        <SingleTask
                          key={todo?.id}
                          content={todo}
                          index={index}
                        />
                      </div>
                    ) : (
                      false
                    ),
                  )
                : todos?.map((todo: SingleTodoInterface, index: number) =>
                    !todo.completed ? (
                      <div key={todo?.id} onClick={() => setTaskId(todo.id)}>
                        <SingleTask
                          key={todo?.id}
                          content={todo}
                          index={index}
                        />
                      </div>
                    ) : (
                      false
                    ),
                  )}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Tasks;
