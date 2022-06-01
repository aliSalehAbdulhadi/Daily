import { SyntheticEvent, useState } from "react";
import { BsFillPersonFill, BsFillArrowDownCircleFill } from "react-icons/bs";
import { MdWork } from "react-icons/md";
import { IoGameController } from "react-icons/io5";

const DropDownMenu = ({ iconValue }: { iconValue: Function }) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [value, setValue] = useState<any>("");

  const iconsHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setValue(target.value);
    iconValue(target.value);
    setHidden(true);
  };

  const dynamicIconHandler = () => {
    if (!value) {
      return (
        <BsFillArrowDownCircleFill
          className={` hover:translate-y-[-5px] duration-500 ease-in-out transition-all ${
            !hidden ? "hidden" : "block"
          }`}
        />
      );
    }

    if (value === "work") {
      return (
        <MdWork
          className={`hover:translate-y-[-5px] duration-500 ease-in-out transition-all ${
            !hidden ? "hidden" : "block"
          }`}
        />
      );
    }

    if (value === "personal") {
      return (
        <BsFillPersonFill
          className={`hover:translate-y-[-5px] duration-500 ease-in-out transition-all ${
            !hidden ? "hidden" : "block"
          }`}
        />
      );
    }

    if (value === "fun") {
      return (
        <IoGameController
          className={`hover:translate-y-[-5px] duration-500 ease-in-out transition-all ${
            !hidden ? "hidden" : "block"
          }`}
        />
      );
    }
  };

  return (
    <div className="w-[5rem] text-white scale-[1.5] flex flex-col mr-[.80rem] mb-1">
      <button
        type="button"
        className="self-end"
        onClick={(e) => {
          setHidden(false);
        }}
      >
        {dynamicIconHandler()}
      </button>
      <button
        type="button"
        className="flex justify-end"
        value="personal"
        onClick={(e) => iconsHandler(e)}
      >
        <h4
          className={`text-[.6rem] mr-1 mt-1 pointer-events-none ${
            hidden ? "hidden" : "block"
          }`}
        >
          Personal
        </h4>
        <BsFillPersonFill
          className={`pointer-events-none mb-1 ${hidden ? "hidden" : "block"}`}
        />
      </button>
      <button
        type="button"
        className="flex justify-end"
        value="work"
        onClick={(e) => iconsHandler(e)}
      >
        <h4
          className={`text-[.6rem] mr-1 mt-1 pointer-events-none  ${
            hidden ? "hidden" : "block"
          }`}
        >
          Work
        </h4>
        <MdWork
          className={`pointer-events-none mb-1 transition-all ease-in-out duration-500 ${
            hidden ? "hidden" : "block"
          }`}
        />
      </button>
      <button
        type="button"
        className="flex justify-end"
        value="fun"
        onClick={(e) => iconsHandler(e)}
      >
        <h4
          className={`text-[.6rem] mr-1 mt-1 pointer-events-none  ${
            hidden ? "hidden" : "block"
          }`}
        >
          Fun
        </h4>
        <IoGameController
          className={`pointer-events-none transition-all ease-in-out duration-500 ${
            hidden ? "hidden" : "block"
          }`}
        />
      </button>
    </div>
  );
};

export default DropDownMenu;
