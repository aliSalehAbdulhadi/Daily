import { RiCheckboxBlankCircleFill } from 'react-icons/ri';

export const dynamicIconHandler = (value: string, hidden: boolean) => {
  if (value === 'personal' || !value) {
    return (
      <RiCheckboxBlankCircleFill
        size={21}
        title="Task Type"
        className={`${
          !hidden ? 'hidden' : 'block'
        } text-white fill-green-200 opacity-70 border-white border-[2px] rounded-full`}
      />
    );
  }

  if (value === 'work') {
    return (
      <RiCheckboxBlankCircleFill
        size={21}
        title="Task Type"
        className={`${
          !hidden ? 'hidden' : 'block'
        } text-white fill-blue-600 opacity-80 border-white border-[2px] p-[.15rem] rounded-full`}
      />
    );
  }

  if (value === 'fun') {
    return (
      <RiCheckboxBlankCircleFill
        size={21}
        title="Task Type"
        className={`${
          !hidden ? 'hidden' : 'block'
        } text-white fill-purple-200 opacity-70 border-white border-[2px] rounded-full`}
      />
    );
  }

  if (value === 'gym') {
    return (
      <RiCheckboxBlankCircleFill
        size={21}
        title="Task Type"
        className={`${
          !hidden ? 'hidden' : 'block'
        } text-white fill-pink-200 opacity-70 border-white border-[2px] rounded-full`}
      />
    );
  }

  if (value === 'friends') {
    return (
      <RiCheckboxBlankCircleFill
        size={21}
        title="Task Type"
        className={`${
          !hidden ? 'hidden' : 'block'
        } text-white fill-teal-200 opacity-70 border-white border-[2px] rounded-full`}
      />
    );
  }

  if (value === 'shopping') {
    return (
      <RiCheckboxBlankCircleFill
        size={21}
        title="Task Type"
        className={`${
          !hidden ? 'hidden' : 'block'
        } text-white fill-[#f8aea7] opacity-70 border-white border-[2px] rounded-full`}
      />
    );
  }

  if (value === 'nature') {
    return (
      <RiCheckboxBlankCircleFill
        size={21}
        title="Task Type"
        className={`${
          !hidden ? 'hidden' : 'block'
        } text-white fill-emerald-200 opacity-70 border-white border-[2px] rounded-full`}
      />
    );
  }
};
