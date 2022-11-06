import { useState } from 'react';
import { ClapSpinner } from 'react-spinners-kit';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { RootState, useAppSelector } from '../../interfaces/interfaces';
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
            <Suspense fallback={<div className="h-screen"></div>}>
              <div className=" semiSm:w-[45%] md:w-[40%] w-full ">
                <Tasks id={(e: string) => setTaskId(e)} />
              </div>
            </Suspense>

            <Suspense fallback={null}>
              <div className="w-[55%] md:w-[60%] hidden semiSm:block">
                <MileStone taskId={taskId} />
              </div>
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksContainer;
