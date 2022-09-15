import React from 'react';

const Overlay = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="h-[100vh] w-full static bottom-0  bg-black z-[99]">
      <div className="z-[100]">{children}</div>
    </div>
  );
};

export default Overlay;
