import React from 'react';
import { MdWifiOff } from 'react-icons/md';

const NoConnectionError = ({ errorType }: { errorType: string }) => {
  return (
    <div className="w-fit h-full flex items-center justify-around flex-row">
      <div className="w-[70%] text-sm">
        You must be connected to {errorType}
      </div>
      <div>
        <MdWifiOff className="cursor-pointer scale-[1.5] transition-all ease-in-out fill-red-600 animate-pulse" />
      </div>
    </div>
  );
};

export default NoConnectionError;
