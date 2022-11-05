import type { NextPage } from 'next';
import { useEffect } from 'react';
import TaskForm from '../src/components/Forms/TaskForm/TaskForm';
import TasksContainer from '../src/components/TasksContainer/TasksContainer';
import {
  RootState,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../src/interfaces/interfaces';
import { storedTasks } from '../src/redux/slices/features/storedTasks';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );

  useEffect(() => {
    //update local tasks storage
    dispatch(storedTasks({ userUid: user }));
  }, [tasks, dispatch, user]);

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
