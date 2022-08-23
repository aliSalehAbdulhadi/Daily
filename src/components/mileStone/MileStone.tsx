import React, { useRef, useState } from 'react';
import { AiFillPlusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsPlusCircle, BsPlusCircleFill } from 'react-icons/bs';
import useClickOutside from '../../hooks/useClickOutside';
import {
  RootState,
  SingleTodoInterface,
  useAppSelector,
} from '../../interfaces/interfaces';

import MileStoneForm from '../Forms/MileStoneForm/MileStoneForm';
import MilestoneSinglePage from '../MilestoneSinglePage/MilestoneSinglePage';

const MileStone = ({ taskId }: { taskId: string }) => {
  const [addMilestone, setAddMilestone] = useState<boolean>(false);
  const [plusIcon, setPlusIcon] = useState<boolean>(false);

  const todos: SingleTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer?.todos,
  );
  const todo = todos.find((todo) => todo?.id === taskId);

  const milestoneRef = useClickOutside(() => {
    setAddMilestone(false);
  });

  const plusRef = useClickOutside(() => {
    setPlusIcon(false);
  });

  return (
    <div className="h-[50vh] w-full m-10 font-Comfortaa transition-all">
      <div className="flex flex-col">
        <h1 className="mb-5 py-3 self-center text-white ">Milestones</h1>
        <div className="bg-primaryColor h-[65vh] rounded overflow-auto scrollBar p-10 text-white">
          <div className=" flex flex-col">
            <div className="self-center mb-10 text-xl">
              <h1>{todo?.content}</h1>
            </div>
            <div>
              {todo?.milestones.map((milestone: any, i) => {
                return (
                  <MilestoneSinglePage
                    key={milestone.id}
                    taskId={taskId}
                    milestone={milestone}
                    index={i}
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
