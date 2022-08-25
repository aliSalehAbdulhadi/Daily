import React, { useEffect, useRef, useState } from 'react';
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import {
  BsCheckCircle,
  BsCheckCircleFill,
  BsFillXCircleFill,
} from 'react-icons/bs';
import useClickOutside from '../../hooks/useClickOutside';
import {
  RootState,
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
}: {
  taskId: any;
  milestone: any;
  index: number;
  todos: SingleTodoInterface[];
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(milestone?.milestoneContent);
  const [deleteAnimation, setDeleteAnimation] = useState<boolean>(false);
  const [deleteIcon, setDeleteIcon] = useState<boolean>(false);
  const [completeIcon, setCompleteIcon] = useState<boolean>(false);

  const editRef = useRef<HTMLTextAreaElement>(null);
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const todo = todos?.find((todo) => todo?.id === taskId);
  const dispatch = useAppDispatch();
  const inputRef = useClickOutside(() => {
    setEdit(false);
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

  return (
    <div>
      <div className="flex justify-between my-5">
        <div className="flex justify-between items-end w-full">
          <div className="w-[90%]  cursor-pointer ">
            {edit ? (
              <div className="border-b-[1px]" ref={inputRef}>
                <textarea
                  ref={editRef}
                  className="w-[100%] py-2 mt-2 rounded outline-none text-black px-2"
                  onChange={(e: any) => setEditText(e?.target?.value)}
                  rows={editText.length / 30}
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
                    deleteAnimation
                      ? 'deleteUnderline'
                      : 'singleMilestoneUnderline w-full'
                  } `}
                ></div>
              </div>
            )}
          </div>
          <div className="flex flex-col semiSm:flex-row items-end ml-2 md:ml-5 h-full">
            <button
              onMouseEnter={() => setCompleteIcon(true)}
              onMouseLeave={() => setCompleteIcon(false)}
              onClick={completeMilestoneHandler}
              className="container w-fit h-fit semiSm:mt-2"
            >
              {milestone?.milestoneCompleted ? (
                <BsFillXCircleFill className=" h-[1.15rem]" />
              ) : completeIcon ? (
                <BsCheckCircleFill className="h-[1.15rem]" />
              ) : (
                <BsCheckCircle className="h-[1.15rem]" />
              )}
            </button>
            <button
              onMouseEnter={() => setDeleteIcon(true)}
              onMouseLeave={() => setDeleteIcon(false)}
              onClick={deleteMilestoneHanlder}
              className="container w-fit h-fit semiSm:mt-2"
            >
              {deleteIcon ? (
                <AiFillDelete className="h-5" />
              ) : (
                <AiOutlineDelete className="h-5 " />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneSinglePage;
