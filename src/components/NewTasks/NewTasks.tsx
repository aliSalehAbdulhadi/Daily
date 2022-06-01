import { Droppable } from "react-beautiful-dnd";
import SingleTask from "./../SingleTask/SingleTask";
import { useAppSelector } from "../../interfaces/interfaces";
import { RootState } from "../../interfaces/interfaces";

const NewTasks = () => {
  const todos: { id: string; content: string; completed: boolean }[] =
    useAppSelector((state: RootState) => state.getTodoReducer.todos);
  return (
    <Droppable droppableId="NewTodos">
      {(provided) => (
        <div
          className="m-10 flex flex-col items-center min-w-[40vw]"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h1 className="mb-5 mt-5 md:mt-0 text-white">New Tasks</h1>
          <div className="w-fit">
            {todos
              ?.slice()
              .reverse()
              .map((todo, index) =>
                !todo.completed ? (
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

export default NewTasks;
