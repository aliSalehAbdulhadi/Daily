import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import { TiArrowBack } from 'react-icons/ti';
import AdvancedForm from '../../src/components/Forms/advancedForm/AdvancedForm';
import MileStoneForm from '../../src/components/Forms/MileStoneForm/MileStoneForm';
import MilestoneControlSection from '../../src/components/milestoneControlSection/MilestoneControlSection';
import MilestoneSinglePage from '../../src/components/MilestoneSinglePage/MilestoneSinglePage';
import ProgressBar from '../../src/components/progressBar/ProgressBar';
import Swipeable from '../../src/components/swipeable/Swipeable';
import useClickOutside from '../../src/hooks/useClickOutside';
import {
  RootState,
  SingleTaskInterface,
  useAppSelector,
  useAppDispatch,
  singleMilestoneInterface,
} from '../../src/interfaces/interfaces';
import { deleteMilestoneLocally } from '../../src/redux/slices/features/getTasksSlice';
import {
  deleteMilestone,
  editMilestone,
} from '../../src/redux/slices/features/MilestonesSlice';

const MileStone = () => {
  const router = useRouter();
  const { id } = router.query;
  const [addMilestone, setAddMilestone] = useState<boolean>(false);
  const [deleteAnimation, setDeleteAnimation] = useState<{
    animation: boolean;
    deletedMilestoneId: string;
  }>({
    animation: false,
    deletedMilestoneId: '',
  });
  const [scroll, setScroll] = useState<boolean>(false);
  const [openAdvancedForm, setOpenAdvancedForm] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );
  const task = tasks?.find((task) => task?.id === id);

  const milestoneAdvancedFormRef = useClickOutside(() => {
    setOpenAdvancedForm(false);
  });
  const scrollRefBottom = useRef<HTMLDivElement>(null);

  const milestoneCompleted = task?.milestones?.filter(
    (ms: any) => ms?.milestoneCompleted === true,
  ).length;
  const percentage =
    milestoneCompleted && task.milestones.length > 0
      ? Math.round((milestoneCompleted / task?.milestones?.length) * 100)
      : 0;
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  const sortMilestonesBy = useAppSelector(
    (state: RootState) => state.sortMilestonesReducer.sortMilestones,
  );

  useEffect(() => {
    setScroll(false);
  }, [task?.id]);

  useEffect(() => {
    if (scroll) {
      scrollRefBottom?.current?.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAdvancedForm]);

  const deleteMilestoneHandler = (milestone: singleMilestoneInterface) => {
    setDeleteAnimation({
      animation: true,
      deletedMilestoneId: milestone.id,
    });
    setTimeout(() => {
      setDeleteAnimation({
        animation: false,
        deletedMilestoneId: milestone.id,
      });
      dispatch(
        deleteMilestone({
          milestone: milestone,
          userUid: user,
          taskId: task?.id,
          allTasks: tasks,
        }),
      );
      dispatch(
        deleteMilestoneLocally({
          milestoneId: milestone?.id,
          taskId: task?.id,
        }),
      );
    }, 500);
  };

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
    <div
      className={`flex flex-col text-sm font-Comfortaa w-full ${
        dark ? 'bg-primaryColor' : 'bg-secondaryLight'
      }  text-white  transition-all`}
    >
      <div
        className={`flex flex-col items-center justify-center w-full border-b-[1px] `}
      >
        <div
          className={`flex py-5 px-3 w-full  ${
            dark ? 'bg-secondaryColor' : 'bg-primaryColor'
          }`}
        >
          <Link href="/">
            <button className=" bg-white px-2  rounded">
              <TiArrowBack fill="#2c5252" size={20} />
            </button>
          </Link>
          <div className="flex items-center mt-1 w-[95%]">
            <h1 className="text-textDark mr-2 ml-3 wrapWord">
              {task?.content}
            </h1>
          </div>
          <div className="sm:w-[7%] ">
            <div className="h-[3rem] w-[3rem]">
              {task && task?.milestones.length > 0 ? (
                <div className="relative">
                  <ProgressBar percentage={percentage} />
                  <div className="absolute top-[46px] right-[43px] text-xs">
                    <span>{milestoneCompleted}</span>
                    <span className="text-xs">/</span>
                    <span>{task.milestones?.length}</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div
          className={`flex w-full shadow-lg  ${
            task?.milestones.length === 0 ? 'mt-0' : 'mt-3'
          }`}
        >
          <div
            className={`w-full px-3 pb-3 mr-1  ${
              task && task?.milestones.length > 0 ? 'block ' : 'hidden'
            }`}
          >
            <MilestoneControlSection taskId={task?.id} />
          </div>
        </div>
      </div>

      <div
        className={`overflow-auto scrollBar flex flex-col w-full ${
          task?.milestones.length === 0 ? 'h-[79.5vh]' : 'h-[71.8vh]'

        }`}
      >
        {milestonesSortHandler()?.map((milestone: any, i) => {
          return (
            <div key={milestone?.id}>
              <Swipeable handler={() => deleteMilestoneHandler(milestone)}>
                <MilestoneSinglePage
                  taskId={String(id)}
                  milestone={milestone}
                  index={i}
                  tasks={tasks}
                  setDeleteAnimationMobile={deleteAnimation}
                />
              </Swipeable>
            </div>
          );
        })}

        <div
          className={`quillFormEnterAnimationMobile z-50 shadow-xl mx-2 mt-10 ${
            openAdvancedForm ? 'block' : 'hidden'
          } `}
          ref={milestoneAdvancedFormRef}
        >
          <AdvancedForm
            setOpenAdvancedForm={setOpenAdvancedForm}
            taskId={String(task?.id)}
          />
        </div>

        <div
          onClick={() => {
            setOpenAdvancedForm(!task?.completed);
            setScroll(true);
          }}
          className={`sticky w-fit bottom-0 mt-5 py-3 z-30 flex flex-col items-center justify-center self-center cursor-pointer ${
            openAdvancedForm ? 'hidden' : 'block'
          }`}
        >
          <h1
            className={`self-center mb-5 ${
              task?.milestones.length === 0 && !task?.completed
                ? 'block'
                : 'hidden'
            }`}
          >
            Add milestones
          </h1>

          {task?.id && !task?.completed ? (
            <BsPlusCircleFill
              fill="white"
              className={`h-8 w-8  transition-all ${
                addMilestone ? 'hidden' : 'block'
              }`}
            />
          ) : (
            <div className="mt-[5rem]">
              {task?.completed ? (
                <span>Cant add milestones to finished tasks</span>
              ) : (
                <span>Select task to add milestones</span>
              )}
            </div>
          )}
        </div>
        <div className="mt-10" ref={scrollRefBottom}></div>
      </div>
    </div>
  );
};

export default MileStone;
