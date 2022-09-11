import React, { useEffect, useRef, useState } from 'react';
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import {
  BsCheckCircle,
  BsCheckCircleFill,
  BsFillXCircleFill,
} from 'react-icons/bs';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { BiX } from 'react-icons/bi';

import useClickOutside from '../../hooks/useClickOutside';
import {
  RootState,
  singleMilestoneInterface,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../interfaces/interfaces';
import {
  completeMilestoneLocally,
  deleteMilestoneLocally,
  editMilestoneLocally,
} from '../../redux/slices/features/getTasksSlice';
import {
  completeMilestone,
  deleteMilestone,
  editMilestone,
} from '../../redux/slices/features/MilestonesSlice';
import { MdOutlineRemoveDone } from 'react-icons/md';

const MilestoneSinglePage = ({
  taskId,
  milestone,
  index,
  tasks,
  setDeleteAnimationMobile,
}: {
  taskId: string;
  milestone: singleMilestoneInterface;
  index: number;
  tasks: SingleTaskInterface[];
  setDeleteAnimationMobile?: {
    animation: boolean;
    deletedMilestoneId: string;
  };
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(milestone?.milestoneContent);
  const [deleteAnimation, setDeleteAnimation] = useState<boolean>(false);
  const [deleteTimer, setDeleteTimer] = useState<boolean>(false);

  const [initialAnimation, setInitialAnimation] = useState<boolean>(false);
  const [deleteIcon, setDeleteIcon] = useState<boolean>(false);
  const [completeIcon, setCompleteIcon] = useState<boolean>(false);

  const editRef = useRef<HTMLTextAreaElement>(null);
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const task = tasks?.find((task) => task?.id === taskId);
  const dispatch = useAppDispatch();

  const inputRef = useClickOutside(() => {
    setEdit(false);
    setEditText(milestone?.milestoneContent);
  });

  const punctCheckbox = useAppSelector(
    (state) => state.milestonePunctCheckboxReducer.milestonePunctCheckbox,
  );

  useEffect(() => {
    editRef?.current?.focus();
  });

  const editMilestoneHanlder = () => {
    if (editText.length === 0) {
      setEditText(milestone?.milestoneContent);
    } else {
      dispatch(
        editMilestone({
          userUid: user,
          taskId: task?.id,
          milestone: milestone,
          milestoneEdit: editText,
          allTasks: tasks,
        }),
      );
      dispatch(
        editMilestoneLocally({
          taskId: task?.id,
          milestoneEdit: editText,
          milestoneId: milestone?.id,
        }),
      ),
        setTimeout(() => {
          setEdit(false);
        }, 500);
    }
  };

  const completeMilestoneHandler = () => {
    dispatch(
      completeMilestoneLocally({
        milestoneId: milestone?.id,
        taskId: task?.id,
      }),
    );

    dispatch(
      completeMilestone({
        milestone: milestone,
        userUid: user,
        taskId: task?.id,
        allTasks: tasks,
      }),
    );
  };

  const deleteMilestoneHanlder = () => {
    setDeleteAnimation(true);
    setTimeout(() => {
      setDeleteAnimation(false);
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
    }, 300);
  };

  useEffect(() => {
    setInitialAnimation(true);
    return () => {
      setInitialAnimation(false);
    };
  }, []);

  return (
    <div className="flex justify-between my-5 font-Comfortaa">
      <div className="flex justify-between items-end w-full">
        <div className="w-[90%]  cursor-pointer ">
          {edit && !milestone.milestoneCompleted ? (
            <div className="border-b-[1px] flex flex-col" ref={inputRef}>
              <textarea
                ref={editRef}
                className="w-[100%] py-2 mt-2 rounded outline-none text-black px-2"
                onChange={(e: any) => setEditText(e?.target?.value)}
                rows={editText.length >= 100 ? 5 : 3}
                value={editText}
              />

              <button
                className=" self-center semiSm:self-start semiSm:ml-1 text-xs bg-opacity-30 text-white bg-black border-[1px] py-1 px-3  rounded my-2 tracking-wider font-semibold w-fit transition-all ease-in-out whitespace-nowrap"
                onClick={editMilestoneHanlder}
              >
                Submit
              </button>
            </div>
          ) : (
            <div
              onClick={() => setEdit(true)}
              className={`font-Comfortaa font-bold flex flex-col py-2 transition-all`}
            >
              <pre
                className={`ml-1 transition-all pb-4 semiSm:pb-0 whitespace-pre-line font-Comfortaa  ${
                  milestone?.milestoneCompleted ? 'strike opacity-60' : ''
                }`}
              >
                {punctCheckbox ? `${index + 1}-` : null}{' '}
                {milestone?.milestoneContent}
              </pre>
              <div
                className={`${
                  initialAnimation ? 'singleMilestoneUnderline' : ''
                } w-full ${
                  deleteAnimation ||
                  (setDeleteAnimationMobile?.animation &&
                    setDeleteAnimationMobile.deletedMilestoneId ===
                      milestone?.id)
                    ? 'deleteUnderline'
                    : ''
                } `}
              ></div>
            </div>
          )}
        </div>
        <div className="flex-col items-end mr-5 md:ml-5 h-full hidden semiSm:flex">
          <button
            onMouseEnter={() => setCompleteIcon(true)}
            onMouseLeave={() => setCompleteIcon(false)}
            onClick={completeMilestoneHandler}
            className="container w-fit h-fit mt-2"
          >
            {milestone?.milestoneCompleted ? (
              <MdOutlineRemoveDone className=" h-[1.15rem]" />
            ) : completeIcon ? (
              <BsCheckCircleFill className="h-[1.15rem]" />
            ) : (
              <BsCheckCircle className="h-[1.15rem]" />
            )}
          </button>

          {deleteTimer ? (
            <div
              className="relative cursor-pointer w-fit h-fit mt-2 mb-3 "
              onClick={() => setDeleteTimer(false)}
            >
              <BiX className="absolute h-4 w-4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
              <CountdownCircleTimer
                size={20}
                strokeWidth={1}
                isPlaying
                duration={1.5}
                trailColor="#427676"
                colors="#ffff"
                onComplete={() => {
                  setDeleteTimer(false);
                  deleteMilestoneHanlder();
                }}
              />
            </div>
          ) : (
            <button
              onMouseEnter={() => setDeleteIcon(true)}
              onMouseLeave={() => setDeleteIcon(false)}
              className="container w-fit h-fit mt-2"
              onClick={() => setDeleteTimer(true)}
            >
              {deleteIcon ? (
                <AiFillDelete className="h-5" />
              ) : (
                <AiOutlineDelete className="h-5 " />
              )}
            </button>
          )}
        </div>
        <div className="flex items-center justify-center h-full ml-3 mr-1 semiSm:hidden">
          <button
            onMouseEnter={() => setCompleteIcon(true)}
            onMouseLeave={() => setCompleteIcon(false)}
            onClick={completeMilestoneHandler}
          >
            {milestone?.milestoneCompleted ? (
              <MdOutlineRemoveDone className=" h-[1.8rem] w-[1.8rem]" />
            ) : (
              <BsCheckCircle className="h-[1.8rem] w-[1.8rem]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MilestoneSinglePage;
