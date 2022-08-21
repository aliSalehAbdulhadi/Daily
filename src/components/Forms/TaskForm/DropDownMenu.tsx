import { SyntheticEvent, useState } from 'react';
import { BsFillPersonFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { MdWork } from 'react-icons/md';
import { IoGameController } from 'react-icons/io5';
import useClickOutside from '../../../hooks/useClickOutside';

const DropDownMenu = ({ iconValue }: { iconValue: Function }) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');

  let domNode = useClickOutside(() => {
    setHidden(true);
  });

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
          title="Chose task type"
          className={`animate-bounce hover:translate-y-[-5px] duration-500 ease-in-out transition-all ${
            !hidden ? 'hidden' : 'block'
          }`}
        />
      );
    }

    if (value === 'work') {
      return (
        <MdWork
          title="Work task"
          className={`animate-bounce hover:translate-y-[-5px] duration-500 ease-in-out transition-all ${
            !hidden ? 'hidden' : 'block'
          }`}
        />
      );
    }

    if (value === 'personal') {
      return (
        <BsFillPersonFill
          title="Personal task"
          className={`animate-bounce hover:translate-y-[-5px] duration-500 ease-in-out transition-all ${
            !hidden ? 'hidden' : 'block'
          }`}
        />
      );
    }

    if (value === 'fun') {
      return (
        <IoGameController
          title="Fun task"
          className={`animate-bounce hover:translate-y-[-5px] duration-500 ease-in-out transition-all ${
            !hidden ? 'hidden' : 'block'
          }`}
        />
      );
    }
  };

  return (
    <div
      ref={domNode}
      className={` w-[5rem] scale-[1.5] flex flex-col mr-[.80rem] mb-1 `}
    >
      <button
        type="button"
        className="self-end"
        onClick={() => {
          setHidden(false);
        }}
      >
        {dynamicIconHandler()}
      </button>
      <button
        type="button"
        className="flex justify-end hover:translate-x-[-5px] transition-all ease-in-out duration-500"
        value="personal"
        onClick={(e) => iconsHandler(e)}
      >
        <label
          className={`text-[.6rem] mr-1 mt-1 pointer-events-none flex items-center justify-center  ${
            hidden ? 'hidden' : 'block'
          }`}
        >
          Personal
          <BsFillPersonFill
            className={`pointer-events-none transition-all scale-150 ease-in-out ml-2 mb-[.2rem] duration-500 ${
              hidden ? 'hidden' : 'block'
            }`}
          />
        </label>
      </button>
      <button
        type="button"
        className="flex justify-end hover:translate-x-[-5px] transition-all ease-in-out duration-500"
        value="work"
        onClick={(e) => iconsHandler(e)}
      >
        <label
          className={`text-[.6rem] mr-1 mt-1 pointer-events-none flex items-center justify-center  ${
            hidden ? 'hidden' : 'block'
          }`}
        >
          Work
          <MdWork
            className={`pointer-events-none transition-all scale-150 ease-in-out ml-2 mb-[.2rem] duration-500 ${
              hidden ? 'hidden' : 'block'
            }`}
          />
        </label>
      </button>
      <button
        type="button"
        className="flex justify-end hover:translate-x-[-5px] transition-all ease-in-out duration-500"
        value="fun"
        onClick={(e) => iconsHandler(e)}
      >
        <label
          className={`text-[.6rem] mr-1 mt-1 pointer-events-none flex items-center justify-center  ${
            hidden ? 'hidden' : 'block'
          }`}
        >
          Fun
          <IoGameController
            className={`pointer-events-none transition-all scale-150 ease-in-out ml-2 mb-[.2rem] duration-500 ${
              hidden ? 'hidden' : 'block'
            }`}
          />
        </label>
      </button>
    </div>
  );
};

export default DropDownMenu;
