import React, { useEffect, useRef, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';

import { BsCheckCircle, BsFillXCircleFill } from 'react-icons/bs';
import useClickOutside from '../../hooks/useClickOutside';
import {
  RootState,
  SingleTodoInterface,
  useAppDispatch,
  useAppSelector,
} from '../../interfaces/interfaces';
import { getTodo } from '../../redux/slices/features/getTodoSlice';
import {
  completeMilestone,
  deleteMilestone,
  editMilestone,
} from '../../redux/slices/features/MilestonesSlice';

const MilestoneSinglePage = ({
  taskId,
  milestone,
  index,
}: {
  taskId: string;
  milestone: any;
  index: number;
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(milestone?.milestoneContent);
  const [deleteAnimation, setDeleteAnimation] = useState<boolean>(false);
  const editRef = useRef<HTMLTextAreaElement>(null);

  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const todos: SingleTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );
  const todo = todos.find((todo) => todo.id === taskId);
  const dispatch = useAppDispatch();
  const inputRef = useClickOutside(() => {
    setEdit(false);
  });

  useEffect(() => {
    editRef?.current?.focus();
  });
  return (
    <div>
      {' '}
      <div key={milestone?.id} className="flex justify-between items-center">
        <div className="flex justify-between w-full ">
          <div className="w-[90%] cursor-pointer ">
            {edit ? (
              <div className="border-b-[1px]" ref={inputRef}>
                <textarea
                  ref={editRef}
                  className="w-[100%] py-2 mt-2 rounded outline-none text-black px-2"
                  onChange={(e: any) => setEditText(e.target.value)}
                  rows={editText.length / 30}
                  value={editText}
                />

                <button
                  className="mb-1 text-sm animate-pulse"
                  onClick={() => {
                    dispatch(
                      editMilestone({
                        userUid: user,
                        todoId: todo?.id,
                        milestone: milestone,
                        milestoneEdit: editText,
                        allTodos: todos,
                      }),
                    );
                    setTimeout(() => {
                      dispatch(getTodo({ userUid: user }));
                      setEdit(false);
                    }, 500);
                  }}
                >
                  Submit
                </button>
              </div>
            ) : (
              <div
                onClick={() => setEdit(true)}
                className={`font-Comfortaa font-bold flex py-2 border-b-[1px] transition-all ${
                  deleteAnimation ? 'deleteAnimation' : ''
                }`}
              >
                {milestone?.milestoneCompleted ? (
                  <s className="ml-1 opacity-60">
                    {index + 1}- {milestone?.milestoneContent}
                  </s>
                ) : (
                  <h1 className="ml-1">
                    {index + 1}- {milestone?.milestoneContent}
                  </h1>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center ml-5 h-full">
            <button
              onClick={() => {
                dispatch(
                  completeMilestone({
                    milestone: milestone,
                    userUid: user,
                    todoId: todo?.id,
                    allTodos: todos,
                  }),
                );

                setTimeout(() => {
                  dispatch(getTodo({ userUid: user }));
                }, 500);
              }}
              className="container w-fit h-fit mt-2"
            >
              {milestone?.milestoneCompleted ? (
                <BsFillXCircleFill className=" h-5" />
              ) : (
                <BsCheckCircle className=" h-5" />
              )}
            </button>
            <button
              onClick={() => {
                dispatch(
                  deleteMilestone({
                    milestone: milestone,
                    userUid: user,
                    todoId: todo?.id,
                    allTodos: todos,
                  }),
                );
                setDeleteAnimation(true);

                setTimeout(() => {
                  dispatch(getTodo({ userUid: user }));
                  setDeleteAnimation(false);
                }, 2000);
              }}
              className="container w-fit h-fit mt-2"
            >
              <AiFillDelete className="h-5 " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneSinglePage;
