import { Suspense, useState } from 'react';
import { RiComputerFill } from 'react-icons/ri';
import { AiFillAndroid, AiFillApple } from 'react-icons/ai';

import PcInstructions from '../src/components/downloadInstructions/pcInstructions/PcInstructions';
import AndroidInstructions from '../src/components/downloadInstructions/androidInstructions/AndroidInstructions';
import AppleInstructions from '../src/components/downloadInstructions/appleInstructions/AppleInstructions';
import useWindowSize from '../src/hooks/useWindowsSize';
import { Dark } from '../src/utilities/globalImports';
import Link from 'next/link';
import { TiArrowBack } from 'react-icons/ti';

const Download = () => {
  const [instruction, setInstruction] = useState<string>('');
  const dark = Dark();
  const vw = useWindowSize();

  return (
    <Suspense>
      <div
        className={`min-h-[90vh] font-Comfortaa flex flex-col items-center relative ${
          dark ? 'bg-secondaryColor' : 'bg-primaryColor'
        } w-full `}
      >
        <div
          className={` absolute left-[29px] top-4 p-2 semiSm:left-[65px] semiSm:top-5 semiSm:p-3 cursor-pointer rounded-full   bg-primaryLight w-fit  flex items-center justify-center hover:bg-opacity-90 transition-all`}
        >
          <Link href={'/'}>
            <TiArrowBack title="Go back" fill="#2c5252" size={22} />
          </Link>
        </div>
        <div className="mt-[5rem]  text-white">
          <div className="flex flex-col items-center">
            <span className="text-2xl">Select Your Platform</span>
          </div>

          <div className="flex items-center justify-between mt-5 ml-1">
            <div className={`${instruction === 'pc' ? 'border-b-[1px]' : ''}`}>
              <button onClick={() => setInstruction('pc')}>
                <RiComputerFill size={40} />
              </button>
            </div>
            <div
              className={`${instruction === 'android' ? 'border-b-[1px]' : ''}`}
            >
              <button onClick={() => setInstruction('android')}>
                <AiFillAndroid size={40} />
              </button>
            </div>
            <div
              className={`${instruction === 'apple' ? 'border-b-[1px]' : ''}`}
            >
              <button onClick={() => setInstruction('apple')}>
                <AiFillApple size={40} />
              </button>
            </div>
          </div>
        </div>
        {instruction === 'pc' ? (
          <PcInstructions />
        ) : instruction === 'android' ? (
          <AndroidInstructions />
        ) : instruction === 'apple' ? (
          <AppleInstructions />
        ) : null}
        {/* to hide X side navbar when taskComPc animation runs */}
        <style>{`body{overflow-x:${vw >= 840 ? 'hidden' : 'auto'}`}</style>
      </div>
    </Suspense>
  );
};

export default Download;
