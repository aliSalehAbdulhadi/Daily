import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { RiSendPlane2Fill, RiSendPlane2Line } from 'react-icons/ri';
import {
  RootState,
  singleMilestoneInterface,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../interfaces/interfaces';
import { setCardColorByTypeHandler } from '../../utilities/setColorByTypeHandler';
import { isOnline } from '../../utilities/isOnline';
import {
  addMilestones,
  deleteMilestone,
} from '../../redux/slices/features/fireBaseActions/MilestonesSlice';
import {
  addMilestoneLocally,
  deleteMilestoneLocally,
} from '../../redux/slices/features/getTasksSlice';
import { toggleOpenMoveMilestone } from '../../redux/slices/features/openMoveMilestoneSlice';

const SingleMoveTaskCard = ({
  moveToTask,
  taskId,
  milestone,
}: {
  moveToTask: SingleTaskInterface;
  taskId: string;
  milestone: singleMilestoneInterface;
}) => {
  const [moveIcon, setMoveIcon] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [cardMoveAnimation, setCardMoveAnimation] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);

  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );

  const uuid = uuidv4();

  const moveMilestoneHandler = () => {
    if (isOnline()) {
      dispatch(
        addMilestones({
          userUid: user,
          milestone: {
            id: uuid,
            milestoneContent: milestone?.milestoneContent,
            milestoneCompleted: milestone?.milestoneCompleted,
            milestoneDate: milestone?.milestoneDate,
          },
          allTasks: tasks,
          taskId: moveToTask?.id,
        }),
      );
    }

    dispatch(
      addMilestoneLocally({
        milestone: {
          id: uuid,
          milestoneContent: milestone?.milestoneContent,
          milestoneCompleted: milestone?.milestoneCompleted,
          milestoneDate: milestone?.milestoneDate,
        },
        taskId: moveToTask?.id,
      }),
    );

    setCardMoveAnimation(true);

    setTimeout(() => {
      setIsDelete(true);
      setCardMoveAnimation(false);
      dispatch(toggleOpenMoveMilestone(false));
    }, 220);
  };

  useEffect(() => {
    const deleteMilestoneHandler = () => {
      if (isOnline()) {
        dispatch(
          deleteMilestone({
            milestoneId: milestone?.id,
            userUid: user,
            taskId: taskId,
            allTasks: tasks,
          }),
        );
      }

      dispatch(
        deleteMilestoneLocally({
          milestoneId: milestone?.id,
          taskId: taskId,
        }),
      );
    };

    if (isDelete) {
      deleteMilestoneHandler();
    }

    return () => {
      setIsDelete(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete, dispatch]);

  return (
    <div
      className={`flex  justify-center transition-all ${
        cardMoveAnimation
          ? 'translate-x-[18.5rem] transition-all duration-200 ease-in-out'
          : ''
      }`}
    >
      <div
        className={`flex items-center w-[90%] h-[80px] shadow-md pl-1 rounded my-1 scrollBar ${setCardColorByTypeHandler(
          true,
          moveToTask,
        )}`}
      >
        <span className="text-sm w-[90%] whitespace-pre-wrap">
          {moveToTask?.content}
        </span>
        <button
          onMouseEnter={() => setMoveIcon(true)}
          onMouseLeave={() => setMoveIcon(false)}
          onClick={moveMilestoneHandler}
          className={`bg-blue-100 h-[100%] w-[30%] semiSm:w-[15%] flex items-center justify-center rounded-r bg-opacity-60 hover:bg-opacity-100 ${setCardColorByTypeHandler(
            true,
            moveToTask,
          )}`}
        >
          <div className="hidden semiSm:block">
            {moveIcon ? (
              <RiSendPlane2Fill className="text-slate-600" />
            ) : (
              <RiSendPlane2Line className="text-slate-600" />
            )}
          </div>
          <div className="semiSm:hidden">
            <RiSendPlane2Fill className=" text-slate-600  h-5 w-5 " />
          </div>
        </button>
      </div>
    </div>
  );
};

export default SingleMoveTaskCard;
