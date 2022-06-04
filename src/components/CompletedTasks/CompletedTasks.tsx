import { Droppable } from "react-beautiful-dnd";
import SingleTask from "./../SingleTask/SingleTask";
import {
  useAppSelector,
  SingeTodoInterface,
} from "../../interfaces/interfaces";
import { RootState } from "../../interfaces/interfaces";

const CompletedTasks = () => {
  const todos: SingeTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );
  return (
    <Droppable droppableId="CompletedTodos">
      {(provided) => (
        <div
          className="m-10 flex flex-col items-center min-w-[40vw] min-h-[25vh] font-Comfortaa font-bold"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h1 className="mb-5 mt-5 md:mt-0 text-white">Completed Tasks</h1>
          <div className="w-fit">
            {todos?.map((todo: SingeTodoInterface, index: number) =>
              todo.completed ? (
                <SingleTask key={todo?.id} content={todo} index={index} />
              ) : (
                false
              ),
            )}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default CompletedTasks;
