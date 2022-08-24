import React, { useState } from 'react';
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

  const todos: SingleTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );
  const todo = todos.find((todo) => todo?.id === taskId);
  const milestoneRef = useClickOutside(() => {
    setAddMilestone(false);
  });
  console.log(todo);
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

  return (
    <div className="m-10 font-Comfortaa transition-all ">
      <div className="flex flex-col ">
        <h1 className="mb-4 py-3 self-center px-5 bg-white text-primaryColor rounded">
          Milestones
        </h1>

        <div className="bg-primaryColor  rounded overflow-auto scrollBar  text-white h-[65vh]">
          <div className=" flex flex-col m-10">
            <div className="mb-7 flex items-center justify-center  w-full">
              <div className="w-[95%] text-secondaryLight text-base">
                Task:
                <h1 className="text-textDark text-xl ">{todo?.content}</h1>
              </div>
              <div>
                <div className="h-[3rem] w-[3rem] lg:h-[4rem] lg:w-[4rem]">
                  {taskId && todo && todo?.milestones.length > 0 ? (
                    <ProgressBar percentage={percentage} />
                  ) : null}
                </div>
              </div>
            </div>
            <div>
              {todo?.milestones.map((milestone: any, i) => {
                return (
                  <MilestoneSinglePage
                    key={milestone.id}
                    taskId={taskId}
                    milestone={milestone}
                    index={i}
                    todos={todos}
                  />
                );
              })}
            </div>
            {addMilestone ? (
              <div ref={milestoneRef}>
                <MileStoneForm taskId={taskId} />
              </div>
            ) : taskId ? (
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
                  />
                ) : (
                  <BsPlusCircle
                    fill="white"
                    className="h-8 w-8 transition-all"
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
