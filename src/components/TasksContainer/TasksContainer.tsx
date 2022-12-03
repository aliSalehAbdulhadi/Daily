import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { RootState, useAppSelector } from '../../interfaces/interfaces';
import useWindowSize from '../../hooks/useWindowsSize';
import FallBackLoading from '../fallBackLoading/FallBackLoading';
import { Dark } from '../../utilities/globalImports';
import useClickOutside from '../../hooks/useClickOutside';
const MileStone = dynamic(() => import('../mileStone/MileStone'), {
  suspense: true,
});
const MobileTasks = dynamic(() => import('../MobileTasks/MobileTasks'), {
  suspense: true,
});
const PcTasks = dynamic(() => import('../PcTasks/PcTasks'), {
  suspense: true,
});

const TasksContainer = () => {
  const dark = Dark();
  const signInStatus = useAppSelector(
    (state: RootState) => state.signInReducer?.state,
  );
  const tasksStatus: any = useAppSelector(
    (state: RootState) => state?.getTaskReducer.status,
  );

  const vw = useWindowSize();

  return (
    <div
      className={` ${
        dark ? 'bg-primaryColor' : 'bg-primaryLight'
      }  w-[100%]  semiSm:pt-[1rem] semiSm:h-[90vh] font-Comfortaa`}
    >
      <div>
        {signInStatus === 'pending' ? (
          <h1 className="font-bold">
            <FallBackLoading />
          </h1>
        ) : (
          <div
            className={`sm:px-10 semiSm:px-0  ${
              dark
                ? 'bg-secondaryColor'
                : 'bg-primaryColor semiSm:bg-secondaryLight'
            }  flex justify-center transition-all ease-in-out `}
          >
            {vw >= 840 ? (
              <Suspense fallback={<FallBackLoading />}>
                {tasksStatus === 'pending' ? (
                  <FallBackLoading />
                ) : (
                  <div className={`w-full transition-all`}>
                    <PcTasks />
                  </div>
                )}
              </Suspense>
            ) : (
              <Suspense fallback={<FallBackLoading />}>
                {tasksStatus === 'pending' ? (
                  <FallBackLoading />
                ) : (
                  <div className={`h-[75vh] w-full transition-all`}>
                    <MobileTasks />
                  </div>
                )}
              </Suspense>
            )}

            {/* to hide X side navbar when taskComPc animation runs */}
            <style>{`body{overflow-x:${vw >= 840 ? 'hidden' : 'auto'}`}</style>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksContainer;
