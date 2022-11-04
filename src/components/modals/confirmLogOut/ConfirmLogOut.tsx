import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react';
import { auth } from '../../../container/firebase';
import { RootState, useAppSelector } from '../../../interfaces/interfaces';
import { persistor } from '../../../redux/store/store';
import Modal from '../Modal/Modal';

const ConfirmLogOut = ({
  setOpen,
  open,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) => {
  const router = useRouter();

  const logOutHandler = () => {
    setOpen(false);
    setTimeout(() => {
      persistor.purge();
      signOut(auth);
      router.push('/');
    }, 500);
  };
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  const isOnline = navigator.onLine;

  return (
    <Modal
      label={
        isOnline
          ? 'Want to log out?'
          : 'Changes added while offline will be removed, Continue?'
      }
      setOpen={setOpen}
      open={open}
    >
      <div className="flex items-center justify-evenly md:text-base text-sm font-Comfortaa">
        <button
          onClick={logOutHandler}
          className="bg-red-600 hover:bg-white hover:text-red-600 text-white  py-2 px-4 rounded whitespace-nowrap"
        >
          Log Out
        </button>

        <button
          onClick={() => setOpen(false)}
          className={`${
            dark ? 'bg-primaryColor' : 'bg-secondaryLight'
          } hover:bg-white hover:text-primaryColor text-white  py-2 px-4 rounded`}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmLogOut;
