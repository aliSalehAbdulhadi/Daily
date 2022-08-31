import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../../container/firebase';
import Modal from '../Modal/Modal';

const ConfirmLogOut = ({
  setOpen,
  open,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) => {
  const logOutHandler = () => {
    setOpen(false);
    setTimeout(() => {
      signOut(auth);
    }, 500);
  };
  return (
    <Modal label="Want to log out?" setOpen={setOpen} open={open}>
      <div className="flex items-center justify-evenly md:text-base text-sm w-[25vh] font-Comfortaa">
        <button
          onClick={logOutHandler}
          className="bg-red-600 hover:bg-white hover:text-red-600 text-white  py-2 px-4 rounded"
        >
          Log Out
        </button>
        <button
          onClick={() => setOpen(false)}
          className="bg-primaryColor hover:bg-white hover:text-primaryColor text-white  py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmLogOut;
