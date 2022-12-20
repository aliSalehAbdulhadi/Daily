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
import { useAppDispatch } from '../../interfaces/interfaces';
import { getTasks } from '../../redux/slices/features/getTasksSlice';
import { toggleDarkMode } from '../../redux/slices/features/darkModeSlice';
import TaskForm from '../Forms/TaskForm/TaskForm';
import useClickOutside from '../../hooks/useClickOutside';
import useWindowSize from '../../hooks/useWindowsSize';
import { Dark, UserKey } from '../../utilities/globalImports';
import { toggleOpenMilestonePanel } from '../../redux/slices/features/openMilestonePanelPc';
import { useRouter } from 'next/router';

const UserModalPc = dynamic(() => import('../modals/UserModalPc/UserModalPc'), {
  suspense: true,
});
const UserModalMobile = dynamic(
  () => import('../modals/userModalMobile/UserModalMobile'),
  {
    suspense: true,
  },
);
const CheckInternet = dynamic(() => import('../checkInternet/CheckInternet'), {
  suspense: true,
});

const Navbar = () => {
  const vw = useWindowSize();

  const [openUserModalPc, setOpenUserModalPc] = useState<boolean>(false);
  const [openUserModalMobile, setOpenUserModalMobile] =
    useState<boolean>(false);
  const [closeAnimation, setCloseAnimation] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const dark = Dark();
  const user = UserKey();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => dispatch(setUserUid(user?.uid)));

    dispatch(getTasks({ userUid: user }));
  }, [dispatch, user]);

  useEffect(() => {
    setOpenUserModalPc(false);
    setOpenUserModalMobile(false);
  }, [user]);

  const userModalRef = useClickOutside(() => {
    closeModalPcHandler();
  });

  const closeModalPcHandler = () => {
    setCloseAnimation(true);
    setTimeout(() => {
      setOpenUserModalPc(false);
      setCloseAnimation(false);
    }, 180);
  };

  const router = useRouter();

  return (
    <nav
      className={`${dark ? 'bg-primaryColor' : 'bg-primaryLight'} ${
        dark ? 'text-textDark' : 'text-textLight'
      } w-full h-[10vh]  flex items-center justify-between px-2 whitespace-nowrap text-sm md:text-base md:px-10 font-Comfortaa`}
    >
      <div className="px-3 flex items-center select-none">
        <div
          onClick={() => dispatch(toggleOpenMilestonePanel(false))}
          className={`cursor-pointer mt-2 hidden semiSm:block h-fit w-fit `}
        >
          <Link href="/">
            {dark ? (
              <div>
                <Image
                  className="transition-all duration-300 ease-in-out"
                  src="/logo/dailyLight.svg"
                  width="75"
                  height="75"
                  alt="Daily logo"
                />
              </div>
            ) : (
              <div>
                <Image
                  className="transition-all duration-300 ease-in-out"
                  src="/logo/dailyDark.svg"
                  width="75"
                  height="75"
                  alt="Daily logo"
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
                  src="/logo/dailyLight.svg"
                  width={vw >= 330 ? '45' : '26'}
                  height="55"
                  alt="Daily logo"
                />
              </div>
            ) : (
              <div>
                <Image
                  className="transition-all duration-300 ease-in-out "
                  src="/logo/dailyDark.svg"
                  width={vw >= 330 ? '45' : '26'}
                  height="55"
                  alt="Daily logo"
                />
              </div>
            )}
          </Link>
        </div>
        <Suspense>
          <div className="ml-4 mb-4 md:mb-0 md:mt-1">
            <CheckInternet />
          </div>
        </Suspense>
      </div>

      <div
        className={`w-full bg-red-100 semiSm:block hidden ${
          router?.pathname === '/download' ? 'invisible' : ''
        }`}
      >
        <TaskForm />
      </div>

      <div className="flex items-center justify-center relative pl-[2rem]">
        <div
          className={`absolute mt-1 xs:mt-0 mr-28 xs:mr-36 ${
            dark ? '' : 'opacity-90'
          }`}
        >
          <input
            title="Dark/Light Mode"
            type="checkbox"
            alt="Dark mode switch"
            name="dark_mode_switch"
            className=" cursor-pointer select-none opacity-0 outline-none scale-75 mt-1"
            onChange={() => {
              dispatch(toggleDarkMode(!dark));
            }}
          />
          <div className="bg-icon w-8 h-5 xs:h-6 bg-no-repeat absolute pointer-events-none top-[-1px] right-[-12px] sm:top-[-1.2px] sm:right-[-14px] sm:w-8 sm:h-6" />
        </div>
        <div
          title="User Setting"
          ref={userModalRef}
          onClick={() => {
            setOpenUserModalPc(true);
            setOpenUserModalMobile(true);
          }}
          className={`flex items-center justify-center border rounded-full mb-[.20rem] py-1 pl-2 pr-1 mr-2 mt-1 xs:mt-0 transition-all ease-in-out duration-200 cursor-pointer`}
        >
          <BsList
            className={`mr-[.20rem] h-3 w-3 xs:h-5 xs:w-5 ${
              dark ? '' : 'opacity-80'
            }`}
            color={dark ? 'white' : 'black '}
          />
          <IoPersonCircleSharp
            className=" w-5 h-5 xs:w-9 xs:h-9 "
            color={dark ? 'white' : '#707070'}
          />
        </div>
        {vw >= 840 ? (
          <Suspense>
            <div className="absolute top-14 right-0 z-50 hidden semiSm:block opacity-100">
              <UserModalPc
                closeAnimation={closeAnimation}
                closeModalHandler={closeModalPcHandler}
                open={openUserModalPc}
              />
            </div>
          </Suspense>
        ) : (
          <Suspense>
            <div className="fixed top-0 right-0  z-50 semiSm:hidden">
              <UserModalMobile
                open={openUserModalMobile}
                setOpen={setOpenUserModalMobile}
              />
            </div>
          </Suspense>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
