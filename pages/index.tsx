import { useEffect } from 'react';
import type { NextPage } from 'next';
import TaskForm from '../src/components/Forms/TaskForm/TaskForm';
import TasksContainer from '../src/components/TasksContainer/TasksContainer';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../src/interfaces/interfaces';
import { dbTasks } from '../src/redux/slices/features/dbTasks';
import { isOnline } from '../src/utilities/isOnline';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);

  useEffect(() => {
    // update local tasks storage
    if (isOnline()) {
      dispatch(dbTasks({ userUid: user }));
    }
  }, [dispatch, user]);

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
