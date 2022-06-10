import {
  RootState,
  useAppSelector,
  SingleTodoInterface,
} from "../../interfaces/interfaces";
import NewTasks from "./../NewTasks/NewTasks";

const TasksContainer = () => {
  const todos: SingleTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);

  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );

  const signInStatus = useAppSelector(
    (state: RootState) => state.signInReducer?.state,
  );

  return (
    <div
      className={`${
        dark ? "bg-primaryColor" : "bg-primaryLight"
      }  w-[100%] md:p-10 md:pt-[5rem] min-h-[90vh] pb-10`}
    >
      {signInStatus === "pending" ? (
        <h1 className="font-bold">Loading...</h1>
      ) : todos?.length > 0 ? (
        <div
          className={`${
            dark ? "bg-secondaryColor" : "bg-secondaryLight"
          }  md:flex justify-around md:rounded transition-all ease-in-out h-[100%] pt-2`}
        >
          <NewTasks />
        </div>
      ) : (
        <div
          className={`${
            dark ? "text-textDark" : "text-textLight"
          } font-Comfortaa mt-10 md:mt-0 self-center p-10 rounded-md text-center mx-10 ${
            user ? "block" : "hidden"
          }`}
        >
          There are no tasks to display.
        </div>
      )}
    </div>
  );
};

export default TasksContainer;
