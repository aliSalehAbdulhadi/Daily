import React, { useEffect, useRef, useState } from 'react';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import useClickOutside from '../../hooks/useClickOutside';
import {
  RootState,
  SingleTaskInterface,
  useAppSelector,
} from '../../interfaces/interfaces';
import MilestoneControlSection from '../milestoneControlSection/MilestoneControlSection';
import MilestoneSinglePage from '../MilestoneSinglePage/MilestoneSinglePage';
import ProgressBar from '../progressBar/ProgressBar';
import AdvancedForm from '../Forms/advancedForm/AdvancedForm';

const MileStone = ({ taskId }: { taskId: string }) => {
  const [plusIcon, setPlusIcon] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);
  const [openAdvancedForm, setOpenAdvancedForm] = useState<boolean>(false);

  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );
  const task = tasks?.find((task) => task?.id === taskId);

  const milestoneAdvancedFormRef = useClickOutside(() => {
    setOpenAdvancedForm(false);
  });
fli
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

    <div className="m-5 flex flex-col  font-Comfortaa transition-all text-white  relative h-[80vh]">
      <h1 className="mb-[1.3rem] py-3 self-center px-5 bg-white text-primaryColor rounded">
        Milestones
      </h1>

      <div className="bg-primaryColor   rounded scrollBar  h-full  w-full relative ">
        <div
          className={`flex flex-col pt-2  ${
            task && task?.milestones.length > 0
              ? 'border-b-[1px] shadow-lg'
              : ''
          }`}
        >
          {taskId && task && task?.milestones.length > 0 ? (
            <div className="mx-10 ">
              <div className="flex items-center justify-between">
                <div className="">
                  <span className="text-secondaryLight text-base">Task:</span>
                  <h1 className="text-textDark text-xl wrapWord">
                    {task?.content}
                  </h1>
                </div>
                <div className="flex items-start justify-end relative mr-1">
                  <div className="w-[4rem]">
                    <ProgressBar percentage={percentage} />
                  </div>
                </div>
              </div>

            </div>
          ) : taskId && !task?.completed ? (
            <span className="self-center mt-[5rem] ml-2">
              Click to add milestones
            </span>
          ) : null}

          <div
            className={`z-50 mx-10  ${
              task && task?.milestones.length > 0 ? 'block ' : 'hidden'
            }`}
          >
            <MilestoneControlSection taskId={task?.id} />
          </div>
        </div>

        <div className="flex flex-col pb-[5rem] items-center h-[58vh] overflow-auto scrollBar">
          <div className="w-full">
            {milestonesSortHandler()?.map((milestone: any, i) => {
              return (
                <div className="mx-10" key={milestone.id}>
                  <MilestoneSinglePage
                    taskId={taskId}
                    milestone={milestone}
                    index={i}
                    tasks={tasks}
                  />
                </div>
              );
            })}
          </div>

          <div
            className={`quillFormEnterAnimation shadow-lg mt-10 w-[90%] ${
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
        </div>

        <div
          className={`w-fit absolute left-[49%] transform-x-[-100%] ${
            task && task?.milestones.length > 0 ? 'bottom-5 ' : ' top-10'
          }`}
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
              className={`cursor-pointer self-center sticky w-fit `}
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
                  className={`h-8 w-8 transition-all  ${
                    openAdvancedForm ? 'hidden' : ''
                  }`}
                  onClick={() => setScroll(true)}
                />
              )}
            </div>
          ) : (
            <div className="mt-[5rem] translate-x-[-50%]">
              {task?.completed ? (
                <span>Cant add milestones to finished tasks</span>
              ) : (
                <span>Select task to add milestones</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MileStone;
