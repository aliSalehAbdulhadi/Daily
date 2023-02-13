import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import TaskForm from '../src/components/Forms/TaskForm/TaskForm';
import { useAppDispatch } from '../src/interfaces/interfaces';
import { trickStore } from '../src/redux/slices/features/trickStore';
import { isOnline } from '../src/utilities/isOnline';
import TasksContainer from '../src/components/TasksContainer/TasksContainer';
import {
  UserKey,
  Tasks,
  DecryptedUserName,
} from '../src/utilities/globalImports';
import SetUserName from '../src/components/modals/setUserName/SetUserName';

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = UserKey();
  const tasks = Tasks();
  const userName = DecryptedUserName();

  useEffect(() => {
    if (isOnline()) {
      // trick redux store to refresh its data so it will sync between multiple opened devices at the same time
      dispatch(trickStore({ trick: 'trick store to refresh.' }));
    }
  }, [dispatch, tasks, user]);

  useEffect(() => {
    setOpen(false);
  }, [user]);

  useEffect(() => {
    //to set the new user document in firestore
    setTimeout(() => {
      if (userName?.length === 0 && user) {
        setOpen(true);
      }
    }, 1000);
  }, [user, userName?.length]);

  if (userName?.length === 0 && user)
    return (
      <div className="h-[90vh] bg-primaryColor">
        <SetUserName open={open} setOpen={setOpen} />;
      </div>
    );
  else {
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
  }
};

export default Home;
