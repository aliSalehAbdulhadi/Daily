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
  SingleTodoInterface,
  useAppDispatch,
  useAppSelector,
} from '../../interfaces/interfaces';
import {
  completeMilestoneLocally,
  deleteMilestoneLocally,
  editMilestoneLocally,
} from '../../redux/slices/features/getTodoSlice';
import {
  completeMilestone,
  deleteMilestone,
  editMilestone,
} from '../../redux/slices/features/MilestonesSlice';

const MilestoneSinglePage = ({
  taskId,
  milestone,
  index,
  todos,
  setDeleteAnimationMobile,
}: {
  taskId: any;
  milestone: singleMilestoneInterface;
  index: number;
  todos: SingleTodoInterface[];
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
  const todo = todos?.find((todo) => todo?.id === taskId);
  const dispatch = useAppDispatch();

  const inputRef = useClickOutside(() => {
    setEdit(false);
    setEditText(milestone?.milestoneContent);
  });

  useEffect(() => {
    editRef?.current?.focus();
  });

  const editMilestoneHanlder = () => {
    editText.length === 0
      ? setEditText(milestone?.milestoneContent)
      : dispatch(
          editMilestone({
            userUid: user,
            todoId: todo?.id,
            milestone: milestone,
            milestoneEdit: editText,
            allTodos: todos,
          }),
        );
    dispatch(
      editMilestoneLocally({
        todoId: todo?.id,
        milestoneEdit: editText,
        milestoneId: milestone?.id,
      }),
    ),
      setTimeout(() => {
        setEdit(false);
      }, 500);
  };

  const completeMilestoneHandler = () => {
    dispatch(
      completeMilestoneLocally({
        milestoneId: milestone?.id,
        todoId: todo?.id,
      }),
    );

    dispatch(
      completeMilestone({
        milestone: milestone,
        userUid: user,
        todoId: todo?.id,
        allTodos: todos,
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
          todoId: todo?.id,
          allTodos: todos,
        }),
      );
      dispatch(
        deleteMilestoneLocally({
          milestoneId: milestone?.id,
          todoId: todo?.id,
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
    <div>
      <div className="flex justify-between my-5">
        <div className="flex justify-between items-end w-full">
          <div className="w-[90%]  cursor-pointer ">
            {edit && !milestone.milestoneCompleted ? (
              <div className="border-b-[1px]" ref={inputRef}>
                <textarea
                  ref={editRef}
                  className="w-[100%] py-2 mt-2 rounded outline-none text-black px-2"
                  onChange={(e: any) => setEditText(e?.target?.value)}
                  rows={
                    editText.length >= 100
                      ? editText.length / 50
                      : editText.length / 15
                  }
                  value={editText}
                />

                <button
                  className="mb-1 ml-1 text-sm animate-pulse tracking-wider"
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
                <h1
                  className={`ml-1 transition-all pb-4 semiSm:pb-0   ${
                    milestone?.milestoneCompleted ? 'strike opacity-60' : ''
                  }`}
                >
                  {index + 1}- {milestone?.milestoneContent}
                </h1>
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
                <BsFillXCircleFill className=" h-[1.15rem]" />
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
                <BsFillXCircleFill className=" h-[1.8rem] w-[1.8rem]" />
              ) : (
                <BsCheckCircle className="h-[1.8rem] w-[1.8rem]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneSinglePage;
