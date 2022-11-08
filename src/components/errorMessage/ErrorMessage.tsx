import Image from 'next/image';
import React from 'react';

const ErrorMessage = ({
  message,
  type,
  imageLink,
  imageAlt,
}: {
  message: string;
  type: string;
  imageLink?: string;
  imageAlt?: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-white font-light">{message}</div>
      <div
        className={` ${
          imageLink && imageLink?.length > 0 ? 'block' : 'hidden'
        }`}
      >
        <Image
          width={450}
          height={450}
          className={`opacity-70`}
          src={imageLink || '/'}
          alt={imageAlt}
        />
      </div>
    </div>
  );
};

export default ErrorMessage;