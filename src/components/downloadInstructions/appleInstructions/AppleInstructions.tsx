import React from 'react';
import Image from 'next/image';
import { RiSafariLine } from 'react-icons/ri';

const AppleInstructions = () => {
  return (
    <div className="mx-5 mt-10 text-white self-center ml-7">
      <div className="w-fit">
        <div className="flex items-center">
          <span>
            1- Open Daily in your <b className="underline">Safari</b> browser
          </span>
          <RiSafariLine className="ml-2" size={20} />
        </div>

        <div className="mt-5 flex flex-col items-start w-fit">
          <div className="flex items-center">
            <span>
              2- tap the <b className="underline">Share Button</b> under the
              search bar.
            </span>
          </div>
          <div className="self-center rounded">
            <Image
              className="rounded"
              src="/images/downloadInstructions/apple/appleInstructions1.webp"
              width={300}
              height={200}
              alt="download instructions for apple devices"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col items-start w-fit">
          <div className="flex items-center">
            <span>
              3- tap <b className="underline">Add to Home Screen</b> option.
            </span>
          </div>
          <div className="self-center ml-[3rem] semiSm:ml-[4rem] mt-5 mb-10">
            <Image
              className="rounded"
              src="/images/downloadInstructions/apple/appleInstructions2.webp"
              width={250}
              height={500}
              alt="download instructions for apple devices"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col items-start w-fit">
          <div className="flex items-center">
            <span>
              4- tap <b className="underline">Add</b>.
            </span>
          </div>
          <div className="self-center ml-5  semiSm:ml-10 mt-5 mb-10">
            <Image
              className="rounded"
              src="/images/downloadInstructions/apple/appleInstructions3.webp"
              width={300}
              height={200}
              alt="download instructions for apple devices"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppleInstructions;
