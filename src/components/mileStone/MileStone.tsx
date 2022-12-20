import dynamic from 'next/dynamic';
import { FC, memo, Suspense, useEffect, useRef, useState } from 'react';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import { TiArrowBack } from 'react-icons/ti';
import { batch } from 'react-redux';
import useClickOutside from '../../hooks/useClickOutside';
import {
  RootState,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../interfaces/interfaces';
import { completedTask } from '../../redux/slices/features/fireBaseActions/completeTaskSlice';
import { completeTaskLocally } from '../../redux/slices/features/getTasksSlice';
import { toggleOpenMilestonePanel } from '../../redux/slices/features/openMilestonePanelPc';
import { Dark, Tasks } from '../../utilities/globalImports';
import { isOnline } from '../../utilities/isOnline';
import MilestoneControlSection from '../milestoneControlSection/MilestoneControlSection';
import ProgressBar from '../progressBar/ProgressBar';
const MilestoneSinglePage = dynamic(
  () => import('../MilestoneSinglePage/MilestoneSinglePage'),
  { suspense: true },
);
const AdvancedForm = dynamic(
  () => import('../Forms/advancedForm/AdvancedForm'),
  { ssr: false },
);

const MileStone: FC<{
  taskId: string;
  user: string;
  tasks: SingleTaskInterface[];
}> = ({
  taskId,
  user,
  tasks,
}: {
  taskId: string;
  user: string;
  tasks: SingleTaskInterface[];
}) => {
  const [plusIcon, setPlusIcon] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);
  const [openAdvancedForm, setOpenAdvancedForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const task = tasks?.find((task) => task?.id === taskId);
  const dispatch = useAppDispatch();

  const milestoneAdvancedFormRef = useClickOutside(() => {
    setOpenAdvancedForm(false);
  });

  const plusRef = useClickOutside(() => {
    setPlusIcon(false);
  });

  const dark = Dark();

  const milestoneCompleted = task?.milestones?.filter(
    (ms: any) => ms?.milestoneCompleted === true,
  )?.length;
  const percentage =
    milestoneCompleted && task.milestones?.length > 0
      ? Math.round((milestoneCompleted / task?.milestones?.length) * 100)
      : 0;

  const scrollRefBottom = useRef<HTMLDivElement>(null);

  const sortMilestonesBy = useAppSelector(
    (state: RootState) => state.sortMilestonesReducer.sortMilestones,
  );

  useEffect(() => {
    setScroll(false);
  }, [taskId]);

  useEffect(() => {
    if (scroll) {
      scrollRefBottom?.current?.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAdvancedForm]);

  const copyMilestones = task ? [...task?.milestones] : [];
  const milestonesSortHandler = () => {
    if (sortMilestonesBy === 'newMilestones') {
      const sortedMilestones = copyMilestones.sort(
        (a: any, b: any) =>
          +new Date(b.milestoneDate) - +new Date(a.milestoneDate),
      );

      return sortedMilestones;
    } else if (sortMilestonesBy === 'oldMilestones') {
      const sortedMilestones = copyMilestones.sort(
        (a: any, b: any) =>
          +new Date(a.milestoneDate) - +new Date(b.milestoneDate),
      );

      return sortedMilestones;
    } else if (sortMilestonesBy === 'completedMilestones') {
      const sortedMilestones = copyMilestones.sort(
        (a: any, b: any) =>
          Number(a?.milestoneCompleted) - Number(b?.milestoneCompleted),
      );

      return sortedMilestones;
    } else return task?.milestones;
  };

  return (
    <div className="m-4 flex flex-col  font-Comfortaa transition-all text-white  relative">
      <div
        className={` rounded overflow-hidden scrollBar w-full relative h-[80vh] ${
          dark ? 'bg-primaryColor' : 'bg-secondaryColor bg-opacity-60'
        }`}
      >
        <div
          className={`flex  ${
            task && task?.milestones?.length > 0
              ? 'border-b-[1px] shadow-lg'
              : ''
          }`}
        >
          <div
            onClick={() => dispatch(toggleOpenMilestonePanel(false))}
            className={`cursor-pointer  bg-primaryLight w-fit  flex items-center justify-center hover:bg-opacity-90 transition-all ${
              task && task?.milestones?.length > 0
                ? 'px-3'
                : ' rounded-full m-5 h-14 w-[3.7rem]'
            }`}
          >
            <TiArrowBack title="Go back" fill="#2c5252" size={22} />
          </div>

          <div className="flex flex-col w-full mt-3">
            {taskId && task && task?.milestones?.length > 0 ? (
              <div className="flex items-center justify-between mx-5">
                <div>
                  <span className="text-secondaryLight text-base">Task:</span>
                  <h1
                    className={`text-textDark text-xl wrapWord ${
                      task?.completed ? 'strike opacity-60' : ''
                    }`}
                  >
                    {task?.content}
                  </h1>
                </div>
                <div className="flex items-start justify-end relative mr-1 ">
                  <div className="w-[4rem]">
                    <ProgressBar percentage={percentage} />
                  </div>
                </div>
              </div>
            ) : null}

            <div
              className={`z-[50] mx-5  ${
                task && task?.milestones?.length > 0 ? 'block ' : 'hidden'
              }`}
            >
              <MilestoneControlSection taskId={task?.id} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mx-5 overflow-auto scrollBar mt-1 h-[63vh]">
          <div className="w-full mb-10 ">
            {milestonesSortHandler()?.map((milestone: any, i) => {
              return (
                <Suspense key={milestone.id}>
                  <div>
                    <MilestoneSinglePage
                      taskId={taskId}
                      milestone={milestone}
                      index={i}
                      tasks={tasks}
                      isEditing={setIsEditing}
                    />
                  </div>
                </Suspense>
              );
            })}
          </div>

          <div
            className={`quillFormEnterAnimation shadow-lg mb-5 w-[90%] ${
              openAdvancedForm ? 'block' : 'hidden'
            } `}
            ref={milestoneAdvancedFormRef}
          >
            <AdvancedForm
              setOpenAdvancedForm={setOpenAdvancedForm}
              taskId={taskId}
            />

            <div ref={scrollRefBottom}></div>
          </div>
          <div
            className={`self-center my-5 ${
              task?.completed ? '' : 'hidden'
            } flex flex-col justify-center items-center`}
          >
            <span>Cant add milestones to finished tasks</span>
            <div className="mt-3">
              <button
                onClick={() =>
                  batch(() => {
                    dispatch(completeTaskLocally({ taskId: taskId }));
                    if (isOnline()) {
                      dispatch(
                        completedTask({
                          userUid: user,
                          taskId: taskId,
                          allTasks: tasks,
                        }),
                      );
                    }
                  })
                }
                className="ml-1 py-1 px-5 border-[1px] rounded hover:bg-white hover:text-textLight"
              >
                Remove from completed tasks ?
              </button>
            </div>
          </div>
        </div>

        <div
          className={`w-fit absolute left-[48.5%] transform-x-[-100%] ${
            openAdvancedForm ? 'hidden' : 'block'
          }  ${task && task?.milestones?.length > 0 ? 'bottom-5 ' : ' top-10'}`}
        >
          {taskId && !task?.completed ? (
            <div
              ref={plusRef}
              onMouseEnter={() => setPlusIcon(true)}
              onMouseLeave={() => setPlusIcon(false)}
              onClick={() => {
                setOpenAdvancedForm(true);
                setPlusIcon(false);
              }}
              className={`cursor-pointer self-center sticky semiSm:block w-fit `}
            >
              {plusIcon ? (
                <BsPlusCircleFill
                  title="Add milestone"
                  fill="white"
                  className="h-8 w-8  transition-all"
                  onClick={() => setScroll(true)}
                />
              ) : (
                <BsPlusCircle
                  title="Add milestone"
                  fill="white"
                  className={`h-8 w-8 transition-all  ${
                    openAdvancedForm || isEditing ? 'hidden' : ''
                  }`}
                  onClick={() => setScroll(true)}
                />
              )}

              <div className="absolute whitespace-nowrap left-[-77px] top-14">
                {taskId &&
                !task?.completed &&
                task &&
                task?.milestones?.length === 0 ? (
                  <span>Click to add milestones</span>
                ) : (
                  ''
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default memo(MileStone);
