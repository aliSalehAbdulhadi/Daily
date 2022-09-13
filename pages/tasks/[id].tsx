import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
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
import { deleteMilestone } from '../../src/redux/slices/features/MilestonesSlice';

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

  const [plusIcon, setPlusIcon] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );
  const task = tasks?.find((task) => task?.id === id);
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
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );

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

  return (
    <div
      className={` transition-all text-sm font-Comfortaa ${
        dark ? 'bg-secondaryColor' : 'bg-secondaryLight'
      }`}
    >
      <div className="flex flex-col ">
        <div
          className={`${
            dark ? 'bg-primaryColor' : 'bg-secondaryLight'
          } scrollBar text-white  transition-all`}
        >
          <div className=" flex flex-col">
            <div
              className={`flex pt-4 pb-5 items-center justify-center w-full ${
                dark ? 'bg-secondaryColor' : 'bg-primaryColor'
              }`}
            >
              <Link href="/">
                <button className=" bg-white px-2 mx-3 rounded">
                  <TiArrowBack fill="#2c5252" size={20} />
                </button>
              </Link>
              <div className=" w-[70%] sm:w-[95%]">
                <h1 className="text-textDark mr-2 ml-3">{task?.content}</h1>
              </div>
              <div className="sm:w-[7%] mr-4">
                <div className="h-[3rem] w-[3rem] lg:h-[4rem] lg:w-[4rem]">
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

            <div className=" flex flex-col items-center  ">
              <h1
                className={`${
                  task?.milestones.length === 0 ? 'block' : 'hidden'
                }`}
              >
                Add milestones
              </h1>

              <div
                className={`z-50 w-full pt-4 pb-5 mx-3 border-b-[1px] shadow-lg  ${
                  task && task?.milestones.length > 0 ? 'block ' : 'hidden'
                }`}
              >
                <div className="mx-3">
                  <MilestoneControlSection taskId={task?.id} />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center w-full ">
                <div className="h-[70vh] overflow-auto w-full">
                  {task?.milestones.map((milestone: any, i) => {
                    return (
                      <div className="mx-3" key={milestone?.id}>
                        <Swipeable
                          handler={() => deleteMilestoneHandler(milestone)}
                        >
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
                    className={`sticky bottom-2 mt-5 py-3 z-50 flex items-center justify-center `}
                  >
                    <div
                      className={`h-fit ${addMilestone ? 'block' : 'hidden'}`}
                      ref={milestoneRef}
                    >
                      <AdvancedForm
                        taskId={String(task?.id)}
                        setAddMilestone={setAddMilestone}
                      />
                    </div>

                    <div
                      ref={plusRef}
                      onMouseEnter={() => setPlusIcon(true)}
                      onMouseLeave={() => setPlusIcon(false)}
                      onClick={() => {
                        setAddMilestone(true);
                        setPlusIcon(false);
                      }}
                      className={`self-center cursor-pointer`}
                    >
                      {plusIcon ? (
                        <BsPlusCircleFill
                          fill="white"
                          className={`h-8 w-8  transition-all ${
                            addMilestone ? 'hidden' : 'block'
                          }`}
                        />
                      ) : (
                        <BsPlusCircle
                          fill="white"
                          className={`h-8 w-8   transition-all ${
                            addMilestone ? 'hidden' : 'block'
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MileStone;
