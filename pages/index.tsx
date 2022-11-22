import { useEffect } from 'react';
import type { NextPage } from 'next';
import TaskForm from '../src/components/Forms/TaskForm/TaskForm';
import { useAppDispatch } from '../src/interfaces/interfaces';
import { trickStore } from '../src/redux/slices/features/trickStore';
import { isOnline } from '../src/utilities/isOnline';
import TasksContainer from '../src/components/TasksContainer/TasksContainer';
import { UserKey, Tasks } from '../src/utilities/globalImports';


const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const user = UserKey();
  const tasks = Tasks();

  useEffect(() => {
    if (isOnline()) {
      // trick redux store to refresh its data so it will sync between multiple opened devices at the same time
      dispatch(trickStore({ trick: 'trick store to refresh' }));
    }
  }, [dispatch, tasks, user]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full semiSm:hidden">
          <TaskForm />
        </div>
        <TasksContainer />
      </div>
    </>
  );
};

export default Home;
