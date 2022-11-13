import { useEffect } from 'react';
import type { NextPage } from 'next';
import TaskForm from '../src/components/Forms/TaskForm/TaskForm';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../src/interfaces/interfaces';
import { trickStore } from '../src/redux/slices/features/trickStore';
import { isOnline } from '../src/utilities/isOnline';
import TasksContainer from '../src/components/TasksContainer/TasksContainer';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);

  useEffect(() => {
    // trick redux store to refresh its data so it will sync between multiple opened devices at the same time
    if (isOnline()) {
      dispatch(trickStore({ trick: 'trick store to refresh' }));
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
