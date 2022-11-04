import { onAuthStateChanged } from 'firebase/auth';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import TaskForm from '../src/components/Forms/TaskForm/TaskForm';
import TasksContainer from '../src/components/TasksContainer/TasksContainer';
import { auth } from '../src/container/firebase';

const Home: NextPage = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (e) => console.log(e));
  }, []);
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
