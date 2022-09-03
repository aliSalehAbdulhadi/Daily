import React, { useEffect, useRef, useState } from 'react';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import useClickOutside from '../../hooks/useClickOutside';
import {
  RootState,
  SingleTodoInterface,
  useAppSelector,
} from '../../interfaces/interfaces';
import MileStoneForm from '../Forms/MileStoneForm/MileStoneForm';
import MilestoneSinglePage from '../MilestoneSinglePage/MilestoneSinglePage';
import ProgressBar from '../progressBar/ProgressBar';

const MileStone = ({ taskId }: { taskId: string }) => {
  const [addMilestone, setAddMilestone] = useState<boolean>(false);
  const [plusIcon, setPlusIcon] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);
  const todos: SingleTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );
  const todo = todos.find((todo) => todo?.id === taskId);
  const milestoneRef = useClickOutside(() => {
    setAddMilestone(false);
  });
  const plusRef = useClickOutside(() => {
    setPlusIcon(false);
  });

  const milestoneCompleted = todo?.milestones?.filter(
    (ms: any) => ms?.milestoneCompleted === true,
  ).length;
  const percentage =
    milestoneCompleted && todo.milestones.length > 0
      ? Math.round((milestoneCompleted / todo?.milestones?.length) * 100)
      : 0;

  const scrollRefBottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScroll(false);
  }, [taskId]);

  useEffect(() => {
    if (scroll) {
      scrollRefBottom?.current?.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo?.milestones.length]);

  return (
    <div className="m-10 font-Comfortaa transition-all">
      <div className="flex flex-col ">
        <h1 className="mb-4 py-3 self-center px-5 bg-white text-primaryColor rounded">
          Milestones
        </h1>

        <div className="bg-primaryColor  rounded overflow-auto scrollBar  text-white h-[65vh]">
          <div className=" flex flex-col m-10">
            {taskId && todo && todo?.milestones.length > 0 ? (
              <div className="flex items-center justify-between w-full mb-7 ">
                <div className="">
                  <span className="text-secondaryLight text-base">Task:</span>
                  <h1 className="text-textDark text-xl font-Handlee">
                    {todo?.content}
                  </h1>
                </div>
                <div className=" w-[4rem] flex items-start justify-end relative mr-4">
                  <ProgressBar percentage={percentage} />
                  <div className="absolute top-[60px] right-[60px] text-sm">
                    <span>{milestoneCompleted}</span>
                    <span className="text-xs">/</span>
                    <span>{todo.milestones?.length}</span>
                  </div>
                </div>
              </div>
            ) : null}
            <div>
              {todo?.milestones.map((milestone: any, i) => {
                return (
                  <div key={milestone.id}>
                    <MilestoneSinglePage
                      taskId={taskId}
                      milestone={milestone}
                      index={i}
                      todos={todos}
                    />
                    <div ref={scrollRefBottom}></div>
                  </div>
                );
              })}
            </div>

            <div
              className={`${addMilestone ? 'block' : 'hidden'} `}
              ref={milestoneRef}
            >
              <MileStoneForm taskId={taskId} />
            </div>
            {taskId ? (
              <div
                ref={plusRef}
                onMouseEnter={() => setPlusIcon(true)}
                onMouseLeave={() => setPlusIcon(false)}
                onClick={() => {
                  setAddMilestone(true);
                  setPlusIcon(false);
                }}
                className={`self-center cursor-pointer mt-10`}
              >
                {plusIcon ? (
                  <BsPlusCircleFill
                    fill="white"
                    className="h-8 w-8  transition-all"
                    onClick={() => setScroll(true)}
                  />
                ) : (
                  <BsPlusCircle
                    fill="white"
                    className={`h-8 w-8 transition-all ${
                      addMilestone ? 'hidden' : ''
                    }`}
                    onClick={() => setScroll(true)}
                  />
                )}
              </div>
            ) : (
              <div className="self-center">Select a task to add milestones</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MileStone;
