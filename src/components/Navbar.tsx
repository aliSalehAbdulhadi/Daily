import { useState } from "react";
import SignIn from "./modals/SignIn";
import SignUp from "./modals/SignUp";

const Navbar = () => {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  return (
    <div className="text-white h-[10vh] bg-primaryColor flex items-center justify-between px-5 whitespace-nowrap text-sm md:text-base md:px-10">
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
        <div className="">
          <button onClick={() => setSignUp(true)}>Sign Up</button>
          <span className="px-2">|</span>
          <button onClick={() => setSignIn(true)}>Sign In</button>
        </div>
      </div>
      <SignIn open={signIn} setOpen={setSignIn} setSignUp={setSignUp} />
      <SignUp open={signUp} setOpen={setSignUp} setSignIn={setSignIn} />
    </div>
  );
};

export default Navbar;
