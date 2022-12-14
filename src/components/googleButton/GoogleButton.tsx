import Image from 'next/image';
import React from 'react';

const GoogleButton = () => {
  return (
    <div className=" rounded bg-textDark  text-gray-800 hover:text-gray-900 cursor-pointer">
      <div className="flex flex-row items-center justify-items-center">
        <Image
          src="/svg/googleIcon.svg"
          width={35}
          height={35}
          alt="Google Icon"
          className=""
        />
        <span className="pr-2 ml-1 font-bold  opacity-[.70] text-xs xs:text-sm ">
          Sign in with Google
        </span>
      </div>
    </div>
  );
};

export default GoogleButton;
