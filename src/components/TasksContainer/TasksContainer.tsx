import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { RootState, useAppSelector } from '../../interfaces/interfaces';
import useWindowSize from '../../hooks/useWindowsSize';
import FallBackLoading from '../fallBackLoading/FallBackLoading';
import { Dark } from '../../utilities/globalImports';

const MobileTasksContainer = dynamic(
  () =>
    import(
      './MobileScreenTaskComponents/MobileTasksContainer/MobileTasksContainer'
    ),
  {
    suspense: true,
  },
);
const PcTasks = dynamic(
  () =>
    import('./bigScreenTaskComponents/BigScreenTasksContainer/BigScreenTasks'),
  {
    suspense: true,
  },
);

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
          <FallBackLoading />
        ) : (
          <div
            className={`  ${
              dark ? 'bg-secondaryColor' : 'bg-primaryColor'
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
                    <MobileTasksContainer />
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
