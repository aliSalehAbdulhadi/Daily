import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { RootState, useAppSelector } from '../../interfaces/interfaces';
import useWindowSize from '../../hooks/useWindowsSize';
import FallBackLoading from '../fallBackLoading/FallBackLoading';
import { Dark } from '../../utilities/globalImports';
const MileStone = dynamic(() => import('../mileStone/MileStone'), {
  suspense: true,
});
const Tasks = dynamic(() => import('../Tasks/Tasks'), {
  suspense: true,
});

const TasksContainer = () => {
  const [taskId, setTaskId] = useState<string>('');
  const dark = Dark()
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
            className={`sm:px-10  ${
              dark
                ? 'bg-secondaryColor'
                : 'bg-primaryColor semiSm:bg-secondaryLight'
            }  flex justify-center transition-all ease-in-out `}
          >
            <Suspense fallback={<FallBackLoading />}>
              {tasksStatus === 'pending' ? (
                <FallBackLoading />
              ) : (
                <div
                  className={`semiSm:w-[45%] h-[75vh] semiSm:h-fit md:w-[40%] w-full transition-all `}
                >
                  <Tasks id={(e: string) => setTaskId(e)} />
                </div>
              )}
            </Suspense>

            {vw >= 840 && taskId ? (
              <Suspense>
                <div
                  className={`w-[60%] md:w-[60%] transition-all ${
                    taskId ? 'taskCompPc' : ''
                  }`}
                >
                  <MileStone taskId={taskId} />
                </div>
              </Suspense>
            ) : null}
            {/* to hide X side navbar when taskComPc animation runs */}
            <style>{`body{overflow-x:${vw >= 840 ? 'hidden' : 'auto'}`}</style>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksContainer;
