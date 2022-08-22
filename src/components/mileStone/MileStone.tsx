import React, { useRef, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
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
  const [editMilestone, setEditMilestone] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const editRef = useRef<HTMLInputElement>(null);

  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const todos: SingleTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );
  const todo = todos.find((todo) => todo.id === taskId);

  const milestoneRef = useClickOutside(() => {
    setAddMilestone(false);
  });

  return (
    <div className="h-[80vh] w-full m-10 font-Comfortaa transition-all">
      <div className="flex flex-col">
        <h1 className="mb-5 py-3 self-center text-white ">Milestones</h1>
        <div className="bg-primaryColor h-[80vh] rounded overflow-auto scrollBar p-10 text-white">
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
                onClick={() => setAddMilestone(true)}
                className={`self-center cursor-pointer mt-10`}
              >
                <AiFillPlusCircle
                  fill="white"
                  className="h-10 w-10 hover:scale-105 transition-all"
                />
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
