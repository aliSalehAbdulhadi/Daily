/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';
import { IoPersonCircleSharp } from 'react-icons/io5';
import SignIn from '../modals/SignIn/SignIn';
import SignUp from '../modals/SignUp/SignUp';
import { auth } from '../../container/firebase';
import { setUserUid } from '../../redux/slices/authentication/userSlice';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../interfaces/interfaces';
import { getTodo } from '../../redux/slices/features/getTodoSlice';
import { toggleDarkMode } from '../../redux/slices/features/darkMode';
import ResetPassword from '../modals/resetPassword/ResetPassword';
import Link from 'next/link';
const Navbar = () => {
  const darkModeFunction = (): any => {
    if (typeof window !== 'undefined') {
      const localDarkOption = localStorage.getItem('darkMode');
      return localDarkOption === 'true' ? true : false;
    }
  };
  const [signIn, setSignIn] = useState<boolean>(false);
  const [signUp, setSignUp] = useState<boolean>(false);
  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const [darkMode, setSetDarkMode] = useState<boolean>(darkModeFunction);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => dispatch(setUserUid(user?.uid)));
    dispatch(getTodo({ userUid: user }));
  }, [dispatch, user]);

  if (typeof window !== 'undefined') {
    localStorage?.setItem('darkMode', JSON.stringify(darkMode));
  }
  useEffect(() => {
    dispatch(toggleDarkMode(darkMode));
  }, [darkMode, dispatch]);

  return (
    <nav
      className={`${dark ? 'bg-primaryColor' : 'bg-primaryLight'} ${
        dark ? 'text-textDark' : 'text-textLight'
      } w-full h-[10vh]  flex items-center justify-between px-5 whitespace-nowrap text-sm md:text-base md:px-10 font-Comfortaa`}
    >
      <div className="px-3 flex select-none">
        <div className={`${dark ? 'hidden' : 'block'} cursor-pointer`}>
          <Link href="/">
            <div>
              <Image
                className="transition-all duration-300 ease-in-out hover:rotate-[360deg]"
                src="/logoBlack.svg"
                width="45"
                height="45"
                alt="Daily-logo"
              />
            </div>
          </Link>
        </div>
        <div className={`${dark ? 'block' : 'hidden'} cursor-pointer`}>
          <Link href="/">
            <div>
              <Image
                className="transition-all duration-300 ease-in-out hover:rotate-[360deg]"
                src="/logo.svg"
                width="45"
                height="45"
                alt="Daily-logo"
              />
            </div>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center relative">
        <div className={`absolute mr-36`}>
          <input
            title="Dark and Light mode"
            type="checkbox"
            alt="Dark mode switch"
            name="dark_mode_switch"
            className=" cursor-pointer select-none opacity-0 outline-none scale-75 mt-1"
            onChange={() => {
              setSetDarkMode(!darkMode);
            }}
          />
          <div className="bg-icon w-8 h-6 bg-no-repeat absolute pointer-events-none top-[-1px] right-[-12px] sm:top-[-0px] sm:right-[-14px] sm:w-8 sm:h-6" />
        </div>
        <div>
          {!user ? (
            <div>
              <button
                className="transition-all duration-300 ease-in-out hover:translate-x-[-3px]"
                onClick={() => setSignUp(true)}
              >
                Sign Up
              </button>
              <span className="px-2">|</span>
              <button
                className="transition-all duration-300 ease-in-out hover:translate-x-[3px]"
                onClick={() => setSignIn(true)}
              >
                Sign In
              </button>
            </div>
          ) : (
            <Link href={`/users `}>
              <div className="flex border rounded-full py-1 pl-2 pr-1 transition-all ease-in-out duration-200 cursor-pointer hover:shadow-lg relative">
                <button>
                  <img
                    className="h-5 mr-2"
                    src="/svg/burger.svg"
                    alt="burger icon"
                  />
                </button>
                <button>
                  <IoPersonCircleSharp size={35} color="#696969" />
                </button>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="absolute top-0 left-0"></div>
      <SignIn
        open={signIn}
        setOpen={setSignIn}
        setSignUp={setSignUp}
        setResetPassword={setResetPassword}
      />
      <SignUp open={signUp} setOpen={setSignUp} setSignIn={setSignIn} />
      <ResetPassword open={resetPassword} setOpen={setResetPassword} />
    </nav>
  );
};

export default Navbar;
