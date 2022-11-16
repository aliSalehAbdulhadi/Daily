import React from 'react';
import { ClapSpinner } from 'react-spinners-kit';
import { UserKey } from '../../utilities/EncryptedData';

const FallBackLoading = () => {
  const user = UserKey();

  return (
    <div
      className={`${
        user ? 'h-[77.5vh] ' : 'h-[100vh]'
      } semiSm:h-[86.2vh] flex items-center justify-center`}
    >
      <div className="mb-[5rem] ml-3">
        <ClapSpinner />
      </div>
    </div>
  );
};

export default FallBackLoading;
