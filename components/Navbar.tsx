import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [burger, setBurger] = useState(false);

  return (
    <div className="text-white w-screen h-[10vh] bg-primaryColor flex items-center justify-between px-5 whitespace-nowrap text-sm md:text-base md:px-10">
      <div className="px-3">
        <h1>Daily Icon</h1>
      </div>
      <div>
        <button className="text-primaryColor  px-5 py-3 bg-secondaryColor rounded-tl-md rounded-br-md hidden sm:block">
          Add New Task
        </button>
      </div>
      <div className="flex items-center relative">
        <div className="absolute right-[170px] sm:right-[180px]">
          <input
            type="checkbox"
            className=" sm:scale-[1.2]"
            onChange={() => console.log("aa")}
          />
          <div className="bg-icon w-7 h-5 bg-no-repeat absolute pointer-events-none top-[-1px] right-[-12px] sm:top-[-0px] sm:right-[-14px] sm:w-8 sm:h-6"></div>
        </div>
        <div className="">
          <button>Sign Up</button>
          <span className="px-2">|</span>
          <button>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
