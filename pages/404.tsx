import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Dark } from '../src/utilities/globalImports';

const NotFoundPage = () => {
  const dark = Dark();
  const [timer, setTimer] = useState<number>(5);
  const router = useRouter();

  useEffect(() => {
    setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
  }, [timer]);
  return (
    <div
      className={`h-[90vh] flex items-center justify-center font-Comfortaa  text-white ${
        dark ? 'bg-secondaryColor' : 'bg-primaryColor'
      }`}
    >
      <div
        className={`flex flex-col semiSm:flex-row items-center justify-around h-[25rem] w-[30rem] semiSm:h-[20rem]  semiSm:w-[50rem] rounded ${
          dark ? 'bg-primaryColor' : 'bg-secondaryColor'
        }`}
      >
        <div className="flex flex-col  justify-center w-[90%] sm:w-[80%] semiSm:w-[60%] relative mt-5">
          <div className="flex items-center   mb-3 ">
            <span className="text-xl semiSm:text-2xl mr-10 sm:mr-[8rem] mt-2">
              Page not found
            </span>
            <Image
              src="/icons/notFound.png"
              width={50}
              height={50}
              alt="Not found icon 404"
            />
          </div>
          <span className="text-base semiSm:w-[90%] opacity-75 ">
            It looks like you have followed a broken link that doesnt belong to
            this website.
          </span>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <div className="flex items-center justify-center">
            <span className="mr-5 text-lg">Redirecting in</span>
            <div className="relative ">
              <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                {timer}s
              </span>
              <CountdownCircleTimer
                size={60}
                strokeWidth={5}
                isPlaying
                duration={5}
                // @ts-ignore
                trailColor={'#f87171'}
                colors="#ffff"
                onComplete={() => {
                  router.push('/');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
