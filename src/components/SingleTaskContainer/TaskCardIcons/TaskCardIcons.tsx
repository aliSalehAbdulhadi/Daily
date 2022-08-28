import { BsFillPersonFill } from 'react-icons/bs';
import { MdWork } from 'react-icons/md';
import { IoGameController } from 'react-icons/io5';

const TaskCardIcons = ({
  icon,
  completed,
}: {
  icon: string;
  completed: boolean;
}) => {
  const dynamicIconHandler = () => {
    if (icon === 'work') {
      return (
        <MdWork
          className={`scale-[1.8] md:scale-[1.5] mt-2 md:mt-0 ${
            completed ? 'fill-blue-500' : ''
          }`}
        />
      );
    }

    if (icon === 'personal') {
      return (
        <BsFillPersonFill
          className={`scale-[1.8] md:scale-[1.5] mt-2 md:mt-0 ${
            completed ? 'fill-green-500' : ''
          }`}
        />
      );
    }
    if (icon === 'fun') {
      return (
        <IoGameController
          className={`scale-[1.8] md:scale-[1.5] mt-2 md:mt-0 ${
            completed ? 'fill-purple-500' : ''
          }`}
        />
      );
    }
  };
  return <div>{dynamicIconHandler()}</div>;
};

export default TaskCardIcons;
