import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from "../modals/SignIn/SignIn";
import SignUp from "../modals/SignUp/SignUp";
import { auth } from "../../container/firebase";
import { setUserUid } from "../../redux/slices/authentication/userSlice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../interfaces/interfaces";
import { getTodo } from "../../redux/slices/features/getTodoSlice";
import { IoMdLogOut } from "react-icons/io";
import Image from "next/image";
import { toggleDarkMode } from "../../redux/slices/features/darkMode";

const Navbar = () => {
  const darkModeFunction = () => {
    if (typeof window !== "undefined") {
      const localDarkOption = localStorage.getItem("darkMode");
      return localDarkOption === "true" ? true : false;
    }
  };
  const [signIn, setSignIn] = useState<boolean>(false);
  const [signUp, setSignUp] = useState<boolean>(false);
  const [darkMode, setSetDarkMode] = useState<Function | boolean>(
    darkModeFunction,
  );
  const [logoutAnimation, setLogoutAnimation] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  useEffect(() => {
    onAuthStateChanged(auth, (user) => dispatch(setUserUid(user?.uid)));
    dispatch(getTodo({ userUid: user }));
  }, [dispatch, user]);

  const logOutHandler = () => {
    setLogoutAnimation(true);
    setTimeout(() => {
      signOut(auth);
      setLogoutAnimation(false);
    }, 500);
  };

  if (typeof window !== "undefined") {
    localStorage?.setItem("darkMode", JSON.stringify(darkMode));
  }
  useEffect(() => {
    dispatch(toggleDarkMode(darkMode));
  }, [darkMode, dispatch]);

  return (
    <div
      className={`${dark ? "bg-primaryColor" : "bg-primaryLight"} ${
        dark ? "text-textDark" : "text-textLight"
      } w-full h-[10vh]  flex items-center justify-between px-5 whitespace-nowrap text-sm md:text-base md:px-10 font-Comfortaa`}
    >
      <div className="px-3 flex">
        <div className={`${dark ? "hidden" : "block"}`}>
          <Image src="/logoBlack.svg" width="45" height="45" alt="Daily-logo" />
        </div>
        <div className={`${dark ? "block" : "hidden"}`}>
          <Image src="/logo.svg" width="45" height="45" alt="Daily-logo" />
        </div>
      </div>

      <div className="flex items-center relative">
        <div className="absolute right-[120px] sm:right-[180px]">
          <input
            type="checkbox"
            className=" cursor-pointer select-none outline-none scale-75 "
            onChange={() => {
              setSetDarkMode(!darkMode);
            }}
          />
          <div className="bg-icon w-7 h-5 bg-no-repeat absolute pointer-events-none top-[-1px] right-[-12px] sm:top-[-0px] sm:right-[-14px] sm:w-8 sm:h-6" />
        </div>
        <div>
          {!user ? (
            <div>
              <button onClick={() => setSignUp(true)}>Sign Up</button>
              <span className="px-2">|</span>
              <button onClick={() => setSignIn(true)}>Sign In</button>
            </div>
          ) : (
            <button className="flex items-center" onClick={logOutHandler}>
              Sign out
              <IoMdLogOut
                className={`scale-[2] ml-4 mb-1 transition-all ease-in-out duration-500 ${
                  logoutAnimation ? "rotate-[-90deg]" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>

      <SignIn open={signIn} setOpen={setSignIn} setSignUp={setSignUp} />
      <SignUp open={signUp} setOpen={setSignUp} setSignIn={setSignIn} />
    </div>
  );
};

export default Navbar;
