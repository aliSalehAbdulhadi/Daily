import React from 'react';
import { RootState, useAppSelector } from '../../interfaces/interfaces';

const LoadingCard = () => {
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  return (
    <div
      className={`h-[10rem] w-[20rem] rounded mb-2 flex justify-between text-xs ${
        dark ? 'bg-primaryColor' : 'bg-secondaryColor'
      } ${dark ? 'text-secondaryColor' : 'text-primaryColor'}`}
    >
      <div className="flex flex-col ml-2 pt-2 items-start w-[73%] mobileTaskCardBoxShadow">
        <div className="flex justify-between w-full ">
          <div
            className={`py-1 px-2 rounded animate-pulse ${
              dark ? 'bg-secondaryColor' : 'bg-primaryColor'
            }`}
          >
            st
          </div>
          <div
            className={`py-1 px-5 mr-2 rounded animate-pulse ${
              dark ? 'bg-secondaryColor' : 'bg-primaryColor'
            }`}
          >
            date
          </div>
        </div>
        <div
          className={`mt-10 py-1 px-10 rounded animate-pulse ${
            dark ? 'bg-secondaryColor' : 'bg-primaryColor'
          }`}
        >
          content
        </div>
        <div
          className={`mt-7 py-1 px-5 rounded animate-pulse ${
            dark ? 'bg-secondaryColor' : 'bg-primaryColor'
          }`}
        >
          buttons
        </div>
      </div>

      <div
        className={`self-center mr-2 h-fit py-1 rounded animate-pulse ${
          dark ? 'bg-secondaryColor' : 'bg-primaryColor'
        }`}
      >
        star
      </div>
    </div>
  );
};

export default LoadingCard;
