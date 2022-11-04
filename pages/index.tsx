import type { NextPage } from 'next';
import TaskForm from '../src/components/Forms/TaskForm/TaskForm';
import TasksContainer from '../src/components/TasksContainer/TasksContainer';

const Home: NextPage = () => {
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
