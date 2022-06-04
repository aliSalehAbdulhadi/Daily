import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from "../modals/SignIn/SignIn";
import SignUp from "./../modals/SignUp/SignUp";
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

const Navbar = () => {
  const [signIn, setSignIn] = useState<boolean>(false);
  const [signUp, setSignUp] = useState<boolean>(false);
  const [logoutAnimation, setLogoutAnimation] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => dispatch(setUserUid(user?.uid)));
    dispatch(getTodo({ userUid: user }));
  }, [dispatch, user]);

  const logOutHandler = () => {
    setLogoutAnimation(true);
    const timer = setTimeout(() => {
      signOut(auth);
      setLogoutAnimation(false);
    }, 500);

    clearTimeout(timer);
  };

  return (
    <div className="text-white w-full h-[10vh] bg-primaryColor flex items-center justify-between px-5 whitespace-nowrap text-sm md:text-base md:px-10 font-Comfortaa">
      <div className="px-3">
        <Image src="/logo.svg" width="50" height="50" alt="Daily-logo" />
      </div>

      <div className="flex items-center relative">
        <div className="absolute right-[170px] sm:right-[180px]">
          <input
            type="checkbox"
            className=" sm:scale-[1.2] cursor-pointer"
            onChange={() => console.log("aa")}
          />
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
