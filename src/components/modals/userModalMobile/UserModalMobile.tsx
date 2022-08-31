import { useEffect, useState } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
import { RootState, useAppSelector } from '../../../interfaces/interfaces';
import ChangeUserName from '../changeUserName/changeUserName';
import ResetPassword from '../resetPassword/ResetPassword';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import ConfirmLogOut from '../confirmLogOut/ConfirmLogOut';

const UserModalMobile = ({
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
    setOpen(false);
  });

  const userName = useAppSelector(
    (state: RootState) => state.getTodoReducer.userName,
  );
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const bodyNoScroll = document.querySelector('body');
  useEffect(() => {
    if (!bodyNoScroll) return;
    open
      ? (bodyNoScroll.style.overflow = 'hidden')
      : (bodyNoScroll.style.overflow = 'visible');
  }, [open, bodyNoScroll]);
  return (
    <div ref={userModalRef} className={` ${open ? 'block' : 'hidden'}`}>
      <div
        className={`userModalEnter ${
          closeAnimation ? 'userModalExit' : ''
        } flex-col flex  w-[100vw] shadow-inner  bg-white  font-cerealNormal text-sm text-textLight `}
      >
        {user ? (
          <div className="flex items-center justify-center w-full my-1 py-2 px-4 hover:bg-gray-50 mt-2 font-cerealMedium border-b-[1.7px] mb-3">
            <h1 className="text-lg">{userName}</h1>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-start w-full">
            <button
              onClick={() => {
                setOpenSignInModal(true);
              }}
              className="w-full  my-1 py-2 px-4 hover:bg-gray-50 mt-2 font-cerealMedium"
            >
              Log in
            </button>
            <button
              onClick={() => {
                setOpenSignUpModal(true);
              }}
              className="w-full  my-1 py-2 px-4 hover:bg-gray-50 mt-2 font-cerealMedium"
            >
              Sign up
            </button>
          </div>
        )}
        {user ? (
          <div className="flex flex-col items-center justify-center pb-2">
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
              className={`w-full text-start my-1 py-2 px-4 hover:bg-gray-50  `}
            >
              Log Out
            </button>
          </div>
        ) : null}

        <ChangeUserName
          open={openUsernameModal}
          setOpen={setOpenUsernameModal}
        />
        <ResetPassword
          open={openPasswordModal}
          setOpen={setOpenPasswordModal}
        />
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
      <div
        onClick={() => {
          setTimeout(() => {
            setOpen(false);
            setCloseAnimation(false);
          }, 200);
          setCloseAnimation(true);
        }}
        className={`bg-black blur-sm opacity-30 min-h-[100vh] userModalLayoutEnter ${
          closeAnimation ? 'userModalLayoutExit' : ''
        }`}
      ></div>
    </div>
  );
};

export default UserModalMobile;
