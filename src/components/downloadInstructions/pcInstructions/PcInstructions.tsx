import React from 'react';
import { ImChrome } from 'react-icons/im';
import { VscDesktopDownload } from 'react-icons/vsc';
import Image from 'next/image';

const PcInstructions = () => {
  return (
    <div className="mx-5  mt-10 text-white self-center ml-7">
      <div className="w-fit">
        <div className="flex items-center">
          <span>
            1- Open Daily in your <b className="underline">Chrome</b> browser
          </span>
          <ImChrome className="ml-2 mb-[0.20rem]" size={18} />
        </div>

        <div className="mt-5 flex flex-col items-start w-fit">
          <div className="flex items-center">
            <span>
              2- Click the <b className="underline">Install Icon</b> in the
              search bar
            </span>
            <VscDesktopDownload className="ml-2" size={18} />
          </div>
          <div className="self-center mt-5">
            <Image
              className="rounded"
              src="/images/downloadInstructions/pc/pcInstructionPic1.webp"
              width={150}
              height={150}
              alt="download instructions for PC"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col items-start w-fit">
          <div className="flex items-center">
            <span>
              3- Click the <b className="underline">Install</b> button
            </span>
            <span className="ml-3 rounded py-2 px-6 bg-blue-600">Install</span>
          </div>
          <div className="self-center mt-5 ml-10 semiSm:ml-[2.8rem] mb-10">
            <Image
              className="rounded"
              src="/images/downloadInstructions/pc/pcInstructionPic2.webp"
              width={250}
              height={200}
              alt="download instructions for PC"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PcInstructions;
