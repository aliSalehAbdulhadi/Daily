import { useState } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
import { RootState, useAppSelector } from '../../../interfaces/interfaces';
import ChangeUserName from '../changeUserName/changeUserName';
import ResetPassword from '../resetPassword/ResetPassword';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import ConfirmLogOut from '../confirmLogOut/ConfirmLogOut';

const UserModalPc = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openPasswordModal, setOpenPasswordModal] = useState<boolean>(false);
  const [openUsernameModal, setOpenUsernameModal] = useState<boolean>(false);
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);
  const [openSignUpModal, setOpenSignUpModal] = useState<boolean>(false);
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);
  const [closeAnimation, setCloseAnimation] = useState<boolean>(false);

  const userModalRef = useClickOutside(() => {
    setCloseAnimation(true);
    setTimeout(() => {
      setOpen(false);
      setCloseAnimation(false);
    }, 200);
  });

  console.log(closeAnimation);
  const userName = useAppSelector(
    (state: RootState) => state.getTodoReducer.userName,
  );
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);

  return (
    <div
      ref={userModalRef}
      className={`userModalEnterPc ${
        closeAnimation ? 'userModalExitPc' : ''
      } flex-col py-1 w-[250px]  shadow-inner rounded-xl bg-white  font-cerealNormal text-sm text-textLight ${
        open ? 'flex' : 'hidden'
      }`}
    >
      {user ? (
        <div className="flex items-center justify-center w-full my-1 py-2 px-4 hover:bg-gray-50 mt-2 font-cerealMedium border-b-[1.7px] mb-3">
          <h1 className="text-lg">{userName}</h1>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-start w-full">
          <button
            onClick={() => {
              setOpenSignUpModal(true);
            }}
            className="w-full text-start my-1 py-2 px-4 hover:bg-gray-50 mt-2 font-cerealMedium"
          >
            Sign up
          </button>
          <button
            onClick={() => {
              setOpenSignInModal(true);
            }}
            className="w-full text-start my-1 pt-2 px-4 pb-5 hover:bg-gray-50 border-b-[1.7px] mb-3"
          >
            Log in
          </button>
        </div>
      )}
      <button
        onClick={() => {
          setOpenUsernameModal(true);
        }}
        className="w-full text-start my-1 py-2 px-4 hover:bg-gray-50"
      >
        Change Username
      </button>
      <button
        onClick={() => setOpenPasswordModal(true)}
        className="w-full text-start my-1 py-2 px-4 hover:bg-gray-50"
      >
        Change Password
      </button>

      <button
        onClick={() => {
          setOpenLogoutModal(true);
        }}
        className={`w-full text-start my-1 py-2 px-4 hover:bg-gray-50  ${
          user ? 'block' : 'hidden'
        }`}
      >
        Log Out
      </button>

      <ChangeUserName open={openUsernameModal} setOpen={setOpenUsernameModal} />
      <ResetPassword open={openPasswordModal} setOpen={setOpenPasswordModal} />
      <SignIn
        open={openSignInModal}
        setOpen={setOpenSignInModal}
        setSignUp={setOpenSignUpModal}
        setResetPassword={setOpenPasswordModal}
      />
      <SignUp
        open={openSignUpModal}
        setOpen={setOpenSignUpModal}
        setSignIn={setOpenSignInModal}
      />
      <ConfirmLogOut open={openLogoutModal} setOpen={setOpenLogoutModal} />
    </div>
  );
};

export default UserModalPc;
