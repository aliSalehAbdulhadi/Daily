import { useState } from 'react';
import { ClapSpinner } from 'react-spinners-kit';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { RootState, useAppSelector } from '../../interfaces/interfaces';
import useWindowSize from '../../hooks/useWindowsSize';
const MileStone = dynamic(() => import('../mileStone/MileStone'), {
  suspense: true,
});
const Tasks = dynamic(() => import('../Tasks/Tasks'), {
  suspense: true,
});

const TasksContainer = () => {
  const [taskId, setTaskId] = useState<string>('');
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  const signInStatus = useAppSelector(
    (state: RootState) => state.signInReducer?.state,
  );

  const vw = useWindowSize();
  return (
    <div
      className={` ${
        dark ? 'bg-primaryColor' : 'bg-primaryLight'
      }  w-[100%]  semiSm:pt-[1rem]  semiSm:h-[90vh] font-Comfortaa`}
    >
      <div>
        {signInStatus === 'pending' ? (
          <h1 className="font-bold">
            Loading <ClapSpinner />
          </h1>
        ) : (
          <div
            className={` sm:px-10  ${
              dark ? 'bg-secondaryColor' : 'bg-secondaryLight'
            }  flex justify-center transition-all ease-in-out `}
          >
            <Suspense fallback={<div className="h-screen" />}>
              <div
                className={`semiSm:w-[45%] md:w-[40%] w-full transition-all `}
              >
                <Tasks id={(e: string) => setTaskId(e)} />
              </div>
            </Suspense>

            {vw >= 840 && taskId ? (
              <Suspense>
                <div
                  className={`w-[55%] md:w-[60%] transition-all ${
                    taskId ? 'taskCompPc' : ''
                  }`}
                >
                  <MileStone taskId={taskId} />
                </div>
              </Suspense>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksContainer;
