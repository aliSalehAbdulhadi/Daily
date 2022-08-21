import { memo, useState } from 'react';
import { ClapSpinner } from 'react-spinners-kit';
import {
  RootState,
  useAppSelector,
  SingleTodoInterface,
} from '../../interfaces/interfaces';
import MileStone from '../mileStone/MileStone';
import Tasks from '../Tasks/Tasks';

const TasksContainer = () => {
  const [taskId, setTaskId] = useState<string>('');
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
        dark ? 'bg-primaryColor' : 'bg-primaryLight'
      }  w-[100%] md:p-10 md:pt-[5rem] min-h-[90vh] pb-10`}
    >
      <div>
        {signInStatus === 'pending' ? (
          <h1 className="font-bold">
            Loading <ClapSpinner />
          </h1>
        ) : todos?.length > 0 ? (
          <div
            className={`${
              dark ? 'bg-secondaryColor' : 'bg-secondaryLight'
            }  flex justify-center rounded transition-all ease-in-out `}
          >
            <div className="md:w-[50%] lg:w-[40%] w-[100%]">
              <Tasks id={(e: string) => setTaskId(e)} />
            </div>

            <div className="w-[50%] hidden md:block">
              <MileStone taskId={taskId} />
            </div>
          </div>
        ) : (
          <div
            className={`${
              dark ? 'text-textDark' : 'text-textLight'
            } font-Comfortaa mt-10 md:mt-0 self-center p-10 rounded-md text-center mx-10 ${
              user ? 'block' : 'hidden'
            }`}
          >
            There are no tasks to display.
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksContainer;
