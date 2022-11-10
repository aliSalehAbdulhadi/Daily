import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { BsList } from 'react-icons/bs';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { auth } from '../../container/firebase';
import { setUserUid } from '../../redux/slices/authentication/userSlice';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../interfaces/interfaces';
import { getTasks } from '../../redux/slices/features/getTasksSlice';
import { toggleDarkMode } from '../../redux/slices/features/darkModeSlice';
import TaskForm from '../Forms/TaskForm/TaskForm';
import CheckInternet from '../checkInternet/CheckInternet';
import useClickOutside from '../../hooks/useClickOutside';
import useWindowSize from '../../hooks/useWindowsSize';
const UserModalPc = dynamic(() => import('../modals/UserModalPc/UserModalPc'), {
  suspense: true,
});
const UserModalMobile = dynamic(
  () => import('../modals/userModalMobile/UserModalMobile'),
  {
    suspense: true,
  },
);

const Navbar = () => {
  const darkModeFunction = (): any => {
    if (typeof window !== 'undefined') {
      const localDarkOption = localStorage.getItem('darkMode');
      return localDarkOption === 'true' ? true : false;
    }
  };

  const vw = useWindowSize();

  const [openUserModalPc, setOpenUserModalPc] = useState<boolean>(false);
  const [openUserModalMobile, setOpenUserModalMobile] =
    useState<boolean>(false);
  const [closeAnimation, setCloseAnimation] = useState<boolean>(false);

  const [darkMode, setSetDarkMode] = useState<boolean>(darkModeFunction);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  useEffect(() => {
    onAuthStateChanged(auth, (user) => dispatch(setUserUid(user?.uid)));
    dispatch(getTasks({ userUid: user }));
  }, [dispatch, user]);

  if (typeof window !== 'undefined') {
    localStorage?.setItem('darkMode', JSON.stringify(darkMode));
  }
  useEffect(() => {
    dispatch(toggleDarkMode(darkMode));
  }, [darkMode, dispatch]);

  useEffect(() => {
    setOpenUserModalPc(false);
    setOpenUserModalMobile(false);
  }, [user]);

  const userModalRef = useClickOutside(() => {
    setCloseAnimation(true);
    setTimeout(() => {
      setOpenUserModalPc(false);
      setCloseAnimation(false);
    }, 180);
  });

  return (
    <nav
      className={`${dark ? 'bg-primaryColor' : 'bg-primaryLight'} ${
        dark ? 'text-textDark' : 'text-textLight'
      } w-full h-[10vh]  flex items-center justify-between px-2 whitespace-nowrap text-sm md:text-base md:px-10 font-Comfortaa`}
    >
      <div className="px-3 flex select-none relative">
        <div className={`cursor-pointer mt-2 hidden semiSm:block`}>
          <Link href="/">
            {dark ? (
              <div>
                <Image
                  className="transition-all duration-300 ease-in-out opacity-90"
                  src="/svg/logo/daily10.svg"
                  width="130"
                  height="130"
                  alt="Daily-logo"
                />
              </div>
            ) : (
              <div>
                <Image
                  className="transition-all duration-300 ease-in-out "
                  src="/svg/logo/dailyDark4.svg"
                  width="130"
                  height="130"
                  alt="Daily-logo"
                />
              </div>
            )}
          </Link>
        </div>

        <div className={`cursor-pointer mt-2 semiSm:hidden `}>
          <Link href="/">
            {dark ? (
              <div>
                <Image
                  className="transition-all duration-300 ease-in-out"
                  src="/svg/logo/daily10.svg"
                  width="60"
                  height="80"
                  alt="Daily-logo"
                />
              </div>
            ) : (
              <div>
                <Image
                  className="transition-all duration-300 ease-in-out "
                  src="/svg/logo/dailyDark4.svg"
                  width="60"
                  height="80"
                  alt="Daily-logo"
                />
              </div>
            )}
          </Link>
        </div>

        <div className="absolute top-[1.9rem] left-[4rem] semiSm:top-[.40rem] semiSm:left-32">
          <CheckInternet />
        </div>
      </div>

      <div className="hidden semiSm:block w-full  ">
        <TaskForm />
      </div>

      <div className="flex items-center justify-center relative pl-[2rem]">
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
          <div className="bg-icon w-8 h-6 bg-no-repeat absolute pointer-events-none top-[-1px] right-[-12px] sm:top-[-1.2px] sm:right-[-14px] sm:w-8 sm:h-6" />
        </div>
        <div
          ref={userModalRef}
          onClick={() => {
            setOpenUserModalPc(true);
            setOpenUserModalMobile(true);
          }}
          className="flex items-center justify-center border rounded-full py-1 pl-2 pr-1 mr-2 transition-all ease-in-out duration-200 cursor-pointer hover:shadow-lg relative"
        >
          <BsList
            className="mr-[.20rem]"
            size={20}
            color={dark ? 'white' : 'black'}
          />
          <IoPersonCircleSharp size={35} color={dark ? 'white' : '#696969'} />
          {vw >= 840 ? (
            <Suspense>
              <div className="absolute top-14 right-0 z-50 hidden semiSm:block">
                <UserModalPc
                  closeAnimation={closeAnimation}
                  open={openUserModalPc}
                />
              </div>
            </Suspense>
          ) : null}
        </div>
      </div>
      {vw < 840 ? (
        <Suspense>
          <div className="fixed top-0 right-0  z-50 semiSm:hidden">
            <UserModalMobile
              open={openUserModalMobile}
              setOpen={setOpenUserModalMobile}
            />
          </div>
        </Suspense>
      ) : null}
    </nav>
  );
};

export default Navbar;
