import { useState } from 'react';
import Link from 'next/link';
import useClickOutside from '../../../hooks/useClickOutside';
import ChangeUserName from '../changeUserName/changeUserName';
import ResetPassword from '../resetPassword/ResetPassword';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import ConfirmLogOut from '../confirmLogOut/ConfirmLogOut';
import { DecryptedUserName, UserKey } from '../../../utilities/globalImports';
import { useRouter } from 'next/router';

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
  const userName = DecryptedUserName();
  const user = UserKey();

  const router = useRouter();

  return (
    <div ref={userModalRef} className={` ${open ? 'block' : 'hidden'} `}>
      <div
        className={`userModalEnter ${
          closeAnimation ? 'userModalExit' : ''
        } flex-col flex  w-[100vw] shadow-inner  bg-white  font-cerealNormal text-xs xs:text-sm text-textLight `}
      >
        {user ? (
          <div
            title=""
            className="flex items-center justify-center w-full my-1 py-2 px-4 hover:bg-gray-50 mt-2 font-cerealMedium border-b-[1.7px] mb-3"
          >
            <h1 className="text-lg">{userName}</h1>
          </div>
        ) : (
          <div className="flex  items-center justify-center w-full h-[25vh]">
            <button
              title="Log In"
              onClick={() => {
                setOpenSignInModal(true);
              }}
              className="w-full  my-1 py-2 px-4 hover:bg-gray-50 mt-2 font-cerealMedium h-[98%]"
              type="button"
            >
              Log in
            </button>
            <div className="border-l-[1px] h-[50%] ml-1"></div>
            <button
              title="Sign Up"
              onClick={() => {
                setOpenSignUpModal(true);
              }}
              className="w-full  my-1 py-2 px-4 hover:bg-gray-50 mt-2 font-cerealMedium h-[98%]"
              type="button"
            >
              Sign up
            </button>
            <div className="border-l-[1px] h-[50%] ml-1"></div>

            <Link href="/download">
              <button
                title="Download Daily"
                className="w-full  my-1 py-2 px-4 hover:bg-gray-50 mt-2 font-cerealMedium h-[98%]"
                type="button"
                onClick={() => {
                  setCloseAnimation(true);
                  setTimeout(() => {
                    setOpen(false);
                    setCloseAnimation(false);
                  }, 200);
                }}
              >
                Download
              </button>
            </Link>
          </div>
        )}
        {user ? (
          <div className="flex flex-col items-center justify-center pb-2">
            {router?.pathname === '/chart' ? (
              <Link href="/">
                <button
                  title="Tasks Chart"
                  className="w-full   py-3 px-4 hover:bg-gray-50 mt-2 font-cerealMedium h-[98%]"
                  type="button"
                  onClick={() => {
                    setCloseAnimation(true);
                    setTimeout(() => {
                      setOpen(false);
                      setCloseAnimation(false);
                    }, 200);
                  }}
                >
                  Home
                </button>
              </Link>
            ) : (
              <Link href="/chart">
                <button
                  title="Tasks Chart"
                  className="w-full  py-3 px-4 hover:bg-gray-50 mt-2 font-cerealMedium h-[98%]"
                  type="button"
                  onClick={() => {
                    setCloseAnimation(true);
                    setTimeout(() => {
                      setOpen(false);
                      setCloseAnimation(false);
                    }, 200);
                  }}
                >
                  Tasks chart
                </button>
              </Link>
            )}

            <button
              title="Change Username"
              onClick={() => {
                setOpenUsernameModal(true);
              }}
              className="w-full text-start py-3 px-4 hover:bg-gray-50"
              type="button"
            >
              Change Username
            </button>
            <button
              title="Change Password"
              onClick={() => setOpenPasswordModal(true)}
              className="w-full text-start py-3 px-4 hover:bg-gray-50"
              type="button"
            >
              Change Password
            </button>

            <Link href="/download">
              <button
                title="Download Daily"
                type="button"
                className="w-full text-start  py-3 px-4 hover:bg-gray-50"
                onClick={() => {
                  setCloseAnimation(true);
                  setTimeout(() => {
                    setOpen(false);
                    setCloseAnimation(false);
                  }, 200);
                }}
              >
                Download Daily
              </button>
            </Link>

            <button
              title="Log Out"
              onClick={() => {
                setOpenLogoutModal(true);
              }}
              className={`w-full text-start py-3 px-4 hover:bg-gray-50  `}
              type="button"
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
          }, 230);
          setCloseAnimation(true);
        }}
        className={`bg-black blur-sm opacity-30 min-h-[100vh] userModalLayoutEnter ${
          closeAnimation ? 'userModalLayoutExit' : ''
        }`}
      />
    </div>
  );
};

export default UserModalMobile;
