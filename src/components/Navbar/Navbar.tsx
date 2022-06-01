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
    setTimeout(() => {
      signOut(auth);
      setLogoutAnimation(false);
    }, 500);
  };

  return (
    <div className="text-white w-full h-[10vh] bg-primaryColor flex items-center justify-between px-5 whitespace-nowrap text-sm md:text-base md:px-10">
      <div className="px-3">
        <h1>Daily Icon</h1>
      </div>

      <div className="flex items-center relative">
        <div className="absolute right-[170px] sm:right-[180px]">
          <input
            type="checkbox"
            className=" sm:scale-[1.2] cursor-pointer"
            onChange={() => console.log("aa")}
          />
          <div className="bg-icon w-7 h-5 bg-no-repeat absolute pointer-events-none top-[-1px] right-[-12px] sm:top-[-0px] sm:right-[-14px] sm:w-8 sm:h-6"></div>
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
                className={`scale-[2] ml-4 transition-all ease-in-out duration-500 ${
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
