import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react';
import { auth } from '../../../container/firebase';
import { persistor } from '../../../redux/store/store';
import Modal from '../Modal/Modal';
import { isOnline } from '../../../utilities/isOnline';
import { Dark } from '../../../utilities/globalImports';

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
  const dark = Dark();

  return (
    <Modal
      label={
        isOnline()
          ? 'Want to log out?'
          : 'Changes added while offline will be removed, Continue?'
      }
      setOpen={setOpen}
      open={open}
    >
      <div className="flex items-center justify-evenly md:text-base text-sm font-Comfortaa py-3 px-2">
        <button
          onClick={logOutHandler}
          className="bg-red-500 hover:bg-white hover:text-red-500 text-white  py-2 px-4 mr-5 rounded whitespace-nowrap"
          type="button"
        >
          Log Out
        </button>

        <button
          onClick={() => setOpen(false)}
          type="button"
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
