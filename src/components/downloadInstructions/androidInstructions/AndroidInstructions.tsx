import React from 'react';
import Image from 'next/image';
import { ImChrome } from 'react-icons/im';

const AndroidInstructions = () => {
  return (
    <div className="mx-5 mt-10 text-white self-center ml-7">
      <div className="w-fit">
        <div className="flex items-center">
          <span>
            1- Open Daily in your <b className="underline">Chrome</b> browser
          </span>
          <ImChrome className="ml-2 mb-[0.20rem]" size={18} />
        </div>

        <div className="mt-5 flex flex-col items-start w-fit">
          <div className="flex items-center  ">
            <span>
              2- open chrome control panel then tap{' '}
              <b className="underline">Install App</b>.
            </span>
          </div>
          <div className="self-center mt-5 rounded">
            <Image
              className="rounded object-fill"
              src="/images/downloadInstructions/android/androidInstructions1.webp"
              width={250}
              height={420}
              alt="download instructions for android devices"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col items-start w-fit">
          <div className="flex items-center">
            <span>
              3- tap the <b className="underline">Install</b> button.
            </span>
          </div>
          <div className="self-center ml-5 semiSm:ml-[3.8rem] mt-5 mb-10">
            <Image
              className="rounded"
              src="/images/downloadInstructions/android/androidInstructions2.webp"
              width={300}
              height={150}
              alt="download instructions for android devices"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AndroidInstructions;
