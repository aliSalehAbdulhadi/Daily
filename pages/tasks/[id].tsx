/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Suspense, memo, useEffect, useMemo, useRef, useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import { TiArrowBack } from 'react-icons/ti';
import dynamic from 'next/dynamic';
import { batch } from 'react-redux';
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
import {
  completeTaskLocally,
  deleteMilestoneLocally,
} from '../../src/redux/slices/features/getTasksSlice';
import { deleteMilestone } from '../../src/redux/slices/features/fireBaseActions/MilestonesSlice';

import { Dark, Tasks, UserKey } from '../../src/utilities/globalImports';
import { isOnline } from '../../src/utilities/isOnline';
import { completedTask } from '../../src/redux/slices/features/fireBaseActions/completeTaskSlice';
import useWindowSize from '../../src/hooks/useWindowsSize';
import NotFoundPage from '../404';
import MilestoneControlSection from '../../src/components/milestonesComponents/mileStonesContainer/milestoneControlSection/MilestoneControlSection';

const MilestoneSinglePage = dynamic(
  () =>
    import(
      '../../src/components/milestonesComponents/MilestoneSinglePage/MilestoneSinglePage'
    ),
  { suspense: true },
);
const AdvancedForm = dynamic(
  () => import('../../src/components/Forms/advancedForm/AdvancedForm'),
  { ssr: false },
);

const MoveMilestoneModalMobile = dynamic(
  () =>
    import(
      '../../src/components/modals/moveMilestoneModal/moveMilestoneModalMobile/MoveMilestoneModalMobile'
    ),
  { suspense: true },
);

const MileStone = () => {
  const router = useRouter();
  const { id } = router.query;
  const [deleteAnimation, setDeleteAnimation] = useState<{
    animation: boolean;
    deletedMilestoneId: string;
  }>({
    animation: false,
    deletedMilestoneId: '',
  });

  const [scroll, setScroll] = useState<boolean>(false);
  const [openAdvancedForm, setOpenAdvancedForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const user = UserKey();

  const tasks: SingleTaskInterface[] = Tasks();
  const task = tasks?.find((task) => task?.id === id);

  const milestoneAdvancedFormRef = useClickOutside(() => {
    setOpenAdvancedForm(false);
  });
  const scrollRefTop = useRef<HTMLDivElement>(null);

  const milestoneCompleted = task?.milestones?.filter(
    (ms: any) => ms?.milestoneCompleted === true,
  ).length;

  const dark = Dark();
  const sortMilestonesBy = useAppSelector(
    (state: RootState) => state.sortMilestonesReducer.sortMilestones,
  );

  const isOpenMoveModal = useAppSelector(
    (state: RootState) =>
      state.openMoveMilestoneReducer.isMoveMilestoneModalOpen,
  );
  const currentSelectedMilestone = useAppSelector(
    (state: RootState) => state.selectedMilestoneReducer.selectedMilestone,
  );

  const percentage = useMemo(() => {
    return milestoneCompleted && task.milestones?.length > 0
      ? Math.round((milestoneCompleted / task?.milestones?.length) * 100)
      : 0;
  }, [milestoneCompleted, task?.milestones?.length]);

  useEffect(() => {
    setScroll(false);
  }, [task?.id]);

  useEffect(() => {
    if (scroll) {
      scrollRefTop?.current?.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAdvancedForm]);

  useEffect(() => {
    setOpenAdvancedForm(false);
  }, [task?.milestones?.length]);

  const vw = useWindowSize();

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

      batch(() => {
        dispatch(
          deleteMilestone({
            milestoneId: milestone?.id,
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
      });
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

  if (vw > 839 || !user) return <NotFoundPage />;

  return (
    <div
      ref={scrollRefTop}
      className={`flex flex-col text-sm font-Comfortaa w-full ${
        openAdvancedForm
          ? 'h-[90vh] overflow-hidden  bg-opacity-70 '
          : 'min-h-[90vh]'
      } ${
        dark ? 'bg-primaryColor' : 'bg-secondaryLight'
      }  text-white  transition-all`}
    >
      <img
        className={`${
          openAdvancedForm ? 'block' : 'hidden'
        } mt-[20rem] opacity-60`}
        src="/images/writingHands.png"
        alt="feather"
      />
      <div className={`${openAdvancedForm ? 'hidden' : 'block'}`}>
        <div
          className={`flex flex-col items-center justify-center w-full sticky top-0 z-40  ${
            task?.milestones?.length === 0 ? '' : 'border-b-[1px]'
          }`}
        >
          <div
            className={`flex  px-3 w-full transition-all py-4 ${
              dark ? 'bg-secondaryColor' : 'bg-primaryColor'
            }`}
          >
            <Link href="/">
              <button className=" bg-white px-2  rounded">
                <TiArrowBack fill="#2c5252" size={20} />
              </button>
            </Link>
            <div className="flex items-center mt-1 w-[95%]">
              <h1
                className={`text-textDark mr-2 ml-3 wrapWord ${
                  task?.completed ? 'strike opacity-60' : ''
                }`}
              >
                {task?.content}
              </h1>
            </div>
            <div className="sm:w-[7%] ">
              <div className="h-[3rem] w-[3rem]">
                {task && task?.milestones?.length > 0 ? (
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
            className={`flex w-full transition-all shadow-md
             ${dark ? 'bg-primaryColor' : 'bg-secondaryLight'}   ${
              task?.milestones?.length === 0 ? 'pt-0' : 'pt-3'
            }`}
          >
            <div
              className={`w-full px-3 pb-3 pt-[0.15rem] mr-1 ${
                task && task?.milestones?.length > 0 ? 'block ' : 'hidden'
              }`}
            >
              <MilestoneControlSection taskId={task?.id} />
            </div>
          </div>
        </div>

        <div className={` flex flex-col w-full`}>
          {milestonesSortHandler()?.map((milestone: any, i) => {
            return (
              <Suspense key={milestone?.id}>
                <Swipeable
                  isDeletingOpen={(e: boolean) => e}
                  isMilestone={true}
                  handler={() => deleteMilestoneHandler(milestone)}
                >
                  <MilestoneSinglePage
                    taskId={String(id)}
                    milestone={milestone}
                    index={i}
                    tasks={tasks}
                    setDeleteAnimationMobile={deleteAnimation}
                    isEditing={setIsEditing}
                  />
                </Swipeable>
              </Suspense>
            );
          })}

          <div
            onClick={() => {
              setOpenAdvancedForm(!task?.completed);
              setScroll(true);
            }}
            className={`sticky w-fit bottom-10 mt-5 ml-2 py-3 z-30 flex flex-col items-center justify-center self-center cursor-pointer ${
              openAdvancedForm || isEditing ? 'hidden' : 'block'
            }`}
          >
            <h1
              className={`self-center mb-5 ${
                task?.milestones?.length === 0 && !task?.completed
                  ? 'block'
                  : 'hidden'
              }`}
            >
              Add milestones
            </h1>

            {!task?.completed ? (
              <BsPlusCircleFill
                fill="white"
                className={`h-8 w-8  transition-all opacity-80`}
              />
            ) : null}
          </div>
          <div
            className={`self-center ${
              task?.completed ? '' : 'hidden'
            } flex flex-col items-center`}
          >
            <span>Cant add milestones to finished tasks</span>
            <button
              onClick={() =>
                batch(() => {
                  dispatch(completeTaskLocally({ taskId: String(id) }));
                  if (isOnline()) {
                    dispatch(
                      completedTask({
                        userUid: user,
                        taskId: String(id),
                        allTasks: tasks,
                      }),
                    );
                  }
                })
              }
              className="mt-3 py-2 px-4 border-[1px] rounded hover:bg-white hover:text-textLight"
            >
              Remove from completed tasks ?
            </button>
          </div>
        </div>
      </div>

      <Suspense>
        <div
          className={`fixed top-0 right-0 w-full  z-50 ${
            isOpenMoveModal ? '' : 'hidden'
          }`}
        >
          <MoveMilestoneModalMobile
            user={user}
            tasks={tasks}
            taskId={task?.id}
            milestone={currentSelectedMilestone}
          />
        </div>
      </Suspense>

      <div
        className={`quillFormEnterAnimationMobile absolute z-50  top-0 ${
          dark ? 'bg-primaryColor' : 'bg-secondaryLight'
        }   ${openAdvancedForm ? 'block' : 'hidden'} `}
        ref={milestoneAdvancedFormRef}
      >
        <AdvancedForm
          setOpenAdvancedForm={setOpenAdvancedForm}
          taskId={String(task?.id)}
          setScroll={setScroll}
        />
      </div>
    </div>
  );
};

export default memo(MileStone);
