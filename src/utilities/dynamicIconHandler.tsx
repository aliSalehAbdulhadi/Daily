import { BsFillPersonFill } from 'react-icons/bs';
import { MdPark, MdWork } from 'react-icons/md';
import { IoGameController } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaShoppingCart, FaUserFriends } from 'react-icons/fa';
import { CgGym } from 'react-icons/cg';

export const dynamicIconHandler = (value: string, hidden: boolean) => {
  if (value === 'personal' || !value) {
    return (
      <BsFillPersonFill
        size={22}
        title="Task Type"
        className={`${!hidden ? 'hidden' : 'block'} `}
      />
    );
  }

  if (value === 'work') {
    return (
      <MdWork
        size={22}
        title="Task Type"
        className={`${!hidden ? 'hidden' : 'block'} `}
      />
    );
  }

  if (value === 'fun') {
    return (
      <IoGameController
        size={22}
        title="Task Type"
        className={`${!hidden ? 'hidden' : 'block'} `}
      />
    );
  }

  if (value === 'gym') {
    return (
      <CgGym
        size={22}
        title="Task Type"
        className={`${!hidden ? 'hidden' : 'block'} `}
      />
    );
  }

  if (value === 'friends') {
    return (
      <FaUserFriends
        size={22}
        title="Task Type"
        className={`${!hidden ? 'hidden' : 'block'} `}
      />
    );
  }

  if (value === 'shopping') {
    return (
      <FaShoppingCart
        size={22}
        title="Task Type"
        className={`${!hidden ? 'hidden' : 'block'} `}
      />
    );
  }

  if (value === 'nature') {
    return (
      <MdPark
        size={22}
        title="Task Type"
        className={`${!hidden ? 'hidden' : 'block'} `}
      />
    );
  }
};
