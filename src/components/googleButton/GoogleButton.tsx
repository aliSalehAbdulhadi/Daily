import Image from 'next/image';
import React from 'react';

const GoogleButton = () => {
  return (
    <div className=" rounded bg-white  text-primaryColor hover:text-secondaryColor cursor-pointer transition-all">
      <div className="flex flex-row items-center justify-items-center">
        <div className="flex items-center  justify-center mobileTaskCardBoxShadow">
          <Image
            src="/svg/googleIcon.svg"
            width={35}
            height={35}
            alt="Google Icon"
          />
        </div>
        <span className="pr-2 font-bold   text-xs py-1 px-3 opacity-90">
          Sign in with Google
        </span>
      </div>
    </div>
  );
};

export default GoogleButton;
