import { BsFillPersonFill } from 'react-icons/bs';
import { MdPark, MdWork } from 'react-icons/md';
import { IoGameController } from 'react-icons/io5';
import { FaShoppingCart, FaUserFriends } from 'react-icons/fa';
import { CgGym } from 'react-icons/cg';

export const dynamicIconHandler = (value: string, hidden: boolean) => {
  if (value === 'personal' || !value) {
    return (
      <BsFillPersonFill
        size={21}
        title="Task Type"
        className={`${!hidden ? 'hidden' : 'block'} `}
      />
    );
  }

  if (value === 'work') {
    return (
      <MdWork
        size={20}
        title="Task Type"
        className={`${!hidden ? 'hidden' : 'block'} `}
      />
    );
  }

  if (value === 'fun') {
    return (
      <IoGameController
        size={21}
        title="Task Type"
        className={`${!hidden ? 'hidden' : 'block'} `}
      />
    );
  }

  if (value === 'gym') {
    return (
      <CgGym
        size={21}
        title="Task Type"
        className={`${!hidden ? 'hidden' : 'block'} `}
      />
    );
  }

  if (value === 'friends') {
    return (
      <FaUserFriends
        size={21}
        title="Task Type"
        className={`${!hidden ? 'hidden' : 'block'} `}
      />
    );
  }

  if (value === 'shopping') {
    return (
      <FaShoppingCart
        size={21}
        title="Task Type"
        className={`${!hidden ? 'hidden' : 'block'} `}
      />
    );
  }

  if (value === 'nature') {
    return (
      <MdPark
        size={21}
        title="Task Type"
        className={`${!hidden ? 'hidden' : 'block'} `}
      />
    );
  }
};
