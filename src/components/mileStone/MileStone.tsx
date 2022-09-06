import React, { useEffect, useRef, useState } from 'react';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import useClickOutside from '../../hooks/useClickOutside';
import {
  RootState,
  SingleTaskInterface,
  useAppSelector,
} from '../../interfaces/interfaces';
import MileStoneForm from '../Forms/MileStoneForm/MileStoneForm';
import MilestoneControlSection from '../milestoneControlSection/MilestoneControlSection';
import MilestoneSinglePage from '../MilestoneSinglePage/MilestoneSinglePage';
import ProgressBar from '../progressBar/ProgressBar';

const MileStone = ({ taskId }: { taskId: string }) => {
  const [addMilestone, setAddMilestone] = useState<boolean>(false);
  const [plusIcon, setPlusIcon] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);

  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );
  const task = tasks.find((task) => task?.id === taskId);
  const milestoneRef = useClickOutside(() => {
    setAddMilestone(false);
  });
  const plusRef = useClickOutside(() => {
    setPlusIcon(false);
  });

  const milestoneCompleted = task?.milestones?.filter(
    (ms: any) => ms?.milestoneCompleted === true,
  ).length;
  const percentage =
    milestoneCompleted && task.milestones.length > 0
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
  }, [task?.milestones.length]);

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
          Number(b?.milestoneCompleted) - Number(a?.milestoneCompleted),
      );

      return sortedMilestones;
    } else return task?.milestones;
  };

  return (
    <div className="m-10 font-Comfortaa transition-all">
      <div className="flex flex-col ">
        <h1 className="mb-[1.3rem] py-3 self-center px-5 bg-white text-primaryColor rounded">
          Milestones
        </h1>

        <div className="bg-primaryColor  rounded overflow-auto scrollBar  text-white h-[65vh]">
          <div className=" flex flex-col m-10 ">
            {taskId && task && task?.milestones.length > 0 ? (
              <div className=" w-full ">
                <div className="flex items-center justify-between">
                  <div className="">
                    <span className="text-secondaryLight text-base">Task:</span>
                    <h1 className="text-textDark text-xl font-Handlee">
                      {task?.content}
                    </h1>
                  </div>
                  <div className=" w-[30%]  flex items-start justify-end relative mr-2">
                    <div className="w-[4rem]">
                      <ProgressBar percentage={percentage} />
                    </div>
                  </div>
                </div>
              </div>
            ) : taskId ? (
              <span className="self-center mt-[5rem]">
                Click to add milestones
              </span>
            ) : null}

            <div
              className={`${
                task && task?.milestones.length > 0 ? 'block ' : 'hidden'
              }`}
            >
              <MilestoneControlSection taskId={task?.id} />
            </div>

            <div>
              {milestonesSortHandler()?.map((milestone: any, i) => {
                return (
                  <div key={milestone.id}>
                    <MilestoneSinglePage
                      taskId={taskId}
                      milestone={milestone}
                      index={i}
                      tasks={tasks}
                    />
                    <div ref={scrollRefBottom}></div>
                  </div>
                );
              })}
            </div>

            <div
              className={`${addMilestone ? 'block' : 'hidden'} `}
              ref={milestoneRef}
            >
              <MileStoneForm taskId={taskId} />
            </div>
            {taskId && !task?.completed ? (
              <div
                ref={plusRef}
                onMouseEnter={() => setPlusIcon(true)}
                onMouseLeave={() => setPlusIcon(false)}
                onClick={() => {
                  setAddMilestone(true);
                  setPlusIcon(false);
                }}
                className={`self-center cursor-pointer mt-10`}
              >
                {plusIcon ? (
                  <BsPlusCircleFill
                    fill="white"
                    className="h-8 w-8  transition-all"
                    onClick={() => setScroll(true)}
                  />
                ) : (
                  <BsPlusCircle
                    fill="white"
                    className={`h-8 w-8 transition-all ${
                      addMilestone ? 'hidden' : ''
                    }`}
                    onClick={() => setScroll(true)}
                  />
                )}
              </div>
            ) : (
              <div className="self-center mt-[5rem]">
                {task?.completed ? (
                  <span className="">
                    Cant add milestone to completed tasks
                  </span>
                ) : (
                  <span>Select task to add milestones</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MileStone;
