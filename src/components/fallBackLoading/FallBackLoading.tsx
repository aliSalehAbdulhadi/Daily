import React from 'react';
import { ClapSpinner } from 'react-spinners-kit';

const FallBackLoading = () => {
  return (
    <div className="h-[77.5vh] semiSm:h-[86.2vh] flex items-center justify-center">
      <div className="mb-[3rem] ml-3">
        <ClapSpinner />
      </div>
    </div>
  );
};

export default FallBackLoading;
