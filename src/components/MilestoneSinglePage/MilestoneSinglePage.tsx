import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { BiX } from 'react-icons/bi';
import { MdOutlineRemoveDone } from 'react-icons/md';
import { FaWindowClose } from 'react-icons/fa';
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
import { modules } from '../../utilities/quillToolBar';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';

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
        <div className={`${edit ? 'w-full' : 'w-[90%]'}  cursor-pointer `}>
          {edit && !milestone.milestoneCompleted ? (
            <div className="border-b-[1px] w-full relative mt-3" ref={inputRef}>
              <button
                type="button"
                onClick={() => setEdit(false)}
                className="absolute text-black right-2  top-[.60rem] "
              >
                <FaWindowClose size={20} />
              </button>
              <ReactQuill
                theme="snow"
                id="quill-edit"
                modules={modules}
                value={editText}
                onChange={setEditText}
              />

              <button
                className="w-full py-2 bg-[#ebebeb] text-black mt-5 rounded-b mb-5"
                onClick={editMilestoneHanlder}
              >
                Submit
              </button>
            </div>
          ) : (
            <div
              onClick={() => setEdit(true)}
              className={`font-Comfortaa font-bold flex flex-col py-2 transition-all  ml-2 semiSm:ml-0`}
            >
              <pre

                className={`flex items-center transition-all semiSm:pb-0 whitespace-pre-line font-Comfortaa  ${

                  milestone?.milestoneCompleted ? 'strike opacity-60' : ''
                }`}
              >
                {punctCheckbox ? `${index + 1}-` : null}{' '}

                <ReactQuill
                  readOnly
                  theme="bubble"
                  value={milestone?.milestoneContent}
                />

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
        <div
          className={`flex items-center justify-center h-full ml-3 mr-4 semiSm:hidden ${
            edit ? 'hidden' : ''
          }`}
        >
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
