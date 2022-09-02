import { useState } from 'react';
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
      }  w-[100%] semiSm:pt-[3rem] min-h-[85vh] semiSm:h-[90vh] font-Comfortaa`}
    >
      <div>
        {signInStatus === 'pending' ? (
          <h1 className="font-bold">
            Loading <ClapSpinner />
          </h1>
        ) : todos?.length > 0 ? (
          <div
            className={` sm:px-10 ${
              dark ? 'bg-secondaryColor' : 'bg-secondaryLight'
            }  flex justify-center transition-all ease-in-out `}
          >
            <div className=" semiSm:w-[45%] md:w-[40%] w-full ">
              <Tasks id={(e: string) => setTaskId(e)} />
            </div>

            <div className="w-[55%] md:w-[60%] hidden semiSm:block">
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
