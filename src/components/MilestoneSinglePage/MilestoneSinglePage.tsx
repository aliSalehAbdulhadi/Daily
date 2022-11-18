import React, { Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { BiX } from 'react-icons/bi';
import { MdOutlineRemoveDone } from 'react-icons/md';
import { FaWindowClose } from 'react-icons/fa';
import { RiSendPlaneLine, RiSendPlaneFill } from 'react-icons/ri';
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
} from '../../redux/slices/features/fireBaseActions/MilestonesSlice';
import { modules } from '../../utilities/quillToolBar';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import { isOnline } from '../../utilities/isOnline';
import useWindowSize from '../../hooks/useWindowsSize';
import { toggleOpenMoveMilestone } from '../../redux/slices/features/openMoveMilestoneSlice';
import { setSelectedMilestone } from '../../redux/slices/features/selectedMilestone';
import { UserKey } from '../../utilities/globalImports';
const MoveMilestoneModal = dynamic(
  () => import('../modals/moveMilestoneModal/MoveMilestoneModal'),
  {
    suspense: true,
  },
);

const MilestoneSinglePage = ({
  taskId,
  milestone,
  index,
  tasks,
  isEditing,
  setDeleteAnimationMobile,
}: {
  taskId: string;
  milestone: singleMilestoneInterface;
  index: number;
  tasks: SingleTaskInterface[];
  isEditing: Function;
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
  const [moveMilestoneIcon, setMoveMilestoneIcon] = useState<boolean>(false);

  const editRef = useRef<HTMLTextAreaElement>(null);
  const user = UserKey();

  const task = tasks?.find((task) => task?.id === taskId);
  const dispatch = useAppDispatch();

  const inputRef = useClickOutside(() => {
    setEdit(false);
    setEditText(milestone?.milestoneContent);
  });
  const punctCheckbox = useAppSelector(
    (state) => state.milestonePunctCheckboxReducer.milestonePunctCheckbox,
  );

  const currentSelectedMilestone = useAppSelector(
    (state: RootState) => state.selectedMilestoneReducer.selectedMilestone,
  );
  const isOpenMoveModal = useAppSelector(
    (state: RootState) =>
      state.openMoveMilestoneReducer.isMoveMilestoneModalOpen,
  );

  //@ts-ignore
  const isCurrentMilestone = currentSelectedMilestone.id === milestone.id;

  const vw = useWindowSize();

  useEffect(() => {
    editRef?.current?.focus();
  });

  useEffect(() => {}, [dispatch, milestone, isOpenMoveModal]);

  useEffect(() => {
    isEditing(edit);
  }, [edit, isEditing]);
  const editMilestoneHanlder = () => {
    if (editText.length === 0) {
      setEditText(milestone?.milestoneContent);
    } else {
      if (isOnline()) {
        dispatch(
          editMilestone({
            userUid: user,
            taskId: task?.id,
            milestone: milestone,
            milestoneEdit: editText,
            allTasks: tasks,
          }),
        );
      }

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
    if (isOnline()) {
      dispatch(
        completeMilestone({
          milestone: milestone,
          userUid: user,
          taskId: task?.id,
          allTasks: tasks,
        }),
      );
    }

    dispatch(
      completeMilestoneLocally({
        milestoneId: milestone?.id,
        taskId: task?.id,
      }),
    );
  };

  const deleteMilestoneHanlder = () => {
    setDeleteAnimation(true);
    setTimeout(() => {
      setDeleteAnimation(false);

      if (isOnline()) {
        dispatch(
          deleteMilestone({
            milestoneId: milestone?.id,
            userUid: user,
            taskId: task?.id,
            allTasks: tasks,
          }),
        );
      }

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
    <div className="flex justify-between my-5 font-Comfortaa relative">
      <div className="flex justify-between items-end w-full">
        <div
          className={`${
            edit && !milestone?.milestoneCompleted ? 'w-full' : 'w-[90%]'
          }  cursor-pointer `}
        >
          {edit && !milestone?.milestoneCompleted ? (
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
                className="w-full py-2 bg-[#ebebeb] text-black mt-5 semiSm:rounded-b mb-5"
                onClick={editMilestoneHanlder}
                type="submit"
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
                className={`flex transition-all semiSm:pb-0 whitespace-pre-line font-Comfortaa  ${
                  milestone?.milestoneCompleted ? 'strike opacity-60' : ''
                }`}
              >
                {punctCheckbox ? (
                  <div className="self-center">{index + 1}-</div>
                ) : null}{' '}
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

        <div className="flex-col items-center justify-center mr-5 md:ml-5 h-full hidden semiSm:flex">
          <button
            onMouseEnter={() => setCompleteIcon(true)}
            onMouseLeave={() => setCompleteIcon(false)}
            onClick={completeMilestoneHandler}
            type="button"
            className="container w-fit h-fit mt-1"
          >
            {milestone?.milestoneCompleted ? (
              <MdOutlineRemoveDone className=" h-[1.15rem]" />
            ) : completeIcon ? (
              <BsCheckCircleFill className="h-[1.15rem]" />
            ) : (
              <BsCheckCircle className="h-[1.15rem]" />
            )}
          </button>

          <button
            onMouseEnter={() => setMoveMilestoneIcon(true)}
            onMouseLeave={() => setMoveMilestoneIcon(false)}
            onClick={() => {
              dispatch(toggleOpenMoveMilestone(true));
              dispatch(setSelectedMilestone(milestone));
            }}
            className="container w-fit h-fit "
            type="button"
          >
            {moveMilestoneIcon || (isOpenMoveModal && isCurrentMilestone) ? (
              <RiSendPlaneFill className="h-5 " />
            ) : (
              <RiSendPlaneLine className="h-5" />
            )}
          </button>

          {deleteTimer ? (
            <div
              className="relative cursor-pointer w-fit h-fit mb-3 "
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
              className="container w-fit h-fit"
              onClick={() => setDeleteTimer(true)}
              type="button"
              title="move milestone button"
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
          className={`flex flex-col items-center justify-center h-full ml-3 mr-4 semiSm:hidden ${
            edit && !milestone?.milestoneCompleted ? 'hidden' : ''
          }`}
        >
          <button
            onMouseEnter={() => setCompleteIcon(true)}
            onMouseLeave={() => setCompleteIcon(false)}
            onClick={completeMilestoneHandler}
            type="button"
          >
            {milestone?.milestoneCompleted ? (
              <MdOutlineRemoveDone className=" h-[1.5rem] w-[1.5rem]" />
            ) : (
              <BsCheckCircle className="h-[1.5rem] w-[1.5rem]" />
            )}
          </button>

          <button
            onClick={() => {
              dispatch(toggleOpenMoveMilestone(true));
              dispatch(setSelectedMilestone(milestone));
            }}
            className="mt-5"
            type="button"
            title="move milestone button"
          >
            {isOpenMoveModal && isCurrentMilestone ? (
              <RiSendPlaneFill className="h-[1.5rem] w-[1.5rem]" />
            ) : (
              <RiSendPlaneLine className="h-[1.5rem] w-[1.5rem]" />
            )}
          </button>
        </div>
      </div>
      {vw <= 840 ? (
        ''
      ) : (
        <Suspense>
          <div
            className={`  top-[-20px] right-14 z-40 ${
              isOpenMoveModal && isCurrentMilestone ? 'absolute' : 'hidden'
            }`}
          >
            <MoveMilestoneModal taskId={taskId} />
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default MilestoneSinglePage;
