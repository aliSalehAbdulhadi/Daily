import { Dispatch, SetStateAction, useState } from 'react';
import Link from 'next/link';
import ChangeUserName from '../changeUserName/changeUserName';
import ResetPassword from '../resetPassword/ResetPassword';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import ConfirmLogOut from '../confirmLogOut/ConfirmLogOut';
import { DecryptedUserName, UserKey } from '../../../utilities/globalImports';

const UserModalPc = ({
  open,
  closeAnimation,
  closeModalHandler,
}: {
  open: boolean;
  closeAnimation: boolean;
  closeModalHandler: Function;
}) => {
  const [openPasswordModal, setOpenPasswordModal] = useState<boolean>(false);
  const [openUsernameModal, setOpenUsernameModal] = useState<boolean>(false);
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);
  const [openSignUpModal, setOpenSignUpModal] = useState<boolean>(false);
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);

  const userName = DecryptedUserName();

  const user = UserKey();

  return (
    <div
      className={`userModalEnterPc ${
        closeAnimation ? 'userModalExitPc' : ''
      } flex-col py-1 w-[250px]  shadow-inner rounded-xl bg-white  font-cerealNormal text-sm text-textLight ${
        open ? 'flex' : 'hidden'
      }`}
    >
      {user ? (
        <div
          title=""
          className="flex items-center justify-center w-full my-1 py-2 px-4 hover:bg-gray-50 mt-2 font-cerealMedium border-b-[1.7px] mb-3"
        >
          <h1 className="text-lg">{userName}</h1>
        </div>
      ) : (
        <div
          onClick={() =>
            setTimeout(() => {
              closeModalHandler();
            })
          }
          className="flex flex-col items-start justify-start w-full"
        >
          <button
            title="Sign Up"
            onClick={() => {
              setOpenSignUpModal(true);
            }}
            className="w-full text-start my-1 py-2 px-4 hover:bg-gray-50 mt-2 font-cerealMedium"
            type="button"
          >
            Sign up
          </button>
          <button
            title="Log In"
            onClick={() => {
              setOpenSignInModal(true);
            }}
            className="w-full text-start my-1 pt-2 px-4 hover:bg-gray-50 mb-3"
            type="button"
          >
            Log in
          </button>
          <button
            title="Download Daily"
            type="button"
            className="w-full text-start my-1 py-2 px-4 hover:bg-gray-50"
          >
            <Link href="/download">Download</Link>
          </button>
        </div>
      )}

      <div
        onClick={() =>
          setTimeout(() => {
            closeModalHandler();
          }, 1000)
        }
        className={`flex flex-col items-center justify-center ${
          user ? 'block' : 'hidden'
        }`}
      >
        <button
          title="Change Username"
          onClick={() => {
            setOpenUsernameModal(true);
          }}
          className="w-full text-start my-1 py-2 px-4 hover:bg-gray-50"
          type="button"
        >
          Change Username
        </button>
        <button
          title="Change Password"
          onClick={() => setOpenPasswordModal(true)}
          className="w-full text-start my-1 py-2 px-4 hover:bg-gray-50"
          type="button"
        >
          Change Password
        </button>

        <button
          title="Download Daily"
          type="button"
          className="w-full text-start my-1 py-2 px-4 hover:bg-gray-50"
        >
          <Link href="/download">Download Daily</Link>
        </button>

        <button
          title="Log Out"
          onClick={() => {
            setOpenLogoutModal(true);
          }}
          className={`w-full text-start my-1 py-2 px-4 hover:bg-gray-50 `}
          type="button"
        >
          Log Out
        </button>
      </div>

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
