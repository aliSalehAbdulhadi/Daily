import React, { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import useClickOutside from '../../hooks/useClickOutside';
import {
  RootState,
  SingleTodoInterface,
  useAppSelector,
} from '../../interfaces/interfaces';
import MileStoneForm from '../Forms/MileStoneForm/MileStoneForm';

const MileStone = ({ taskId }: { taskId: string }) => {
  const [addMilestone, setAddMilestone] = useState<boolean>(false);
  const todos: SingleTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );
  const todo = todos.find((todo) => todo.id === taskId);

  const milestoneRef = useClickOutside(() => {
    setAddMilestone(false);
  });

  return (
    <div className="h-[80vh] w-full m-10 font-Comfortaa">
      <div className="flex flex-col">
        <h1 className="mb-5 py-3 self-center text-white ">Milestones</h1>
        <div className="bg-primaryColor h-[80vh] rounded overflow-auto scrollBar p-10 text-white">
          <div className=" flex flex-col">
            <div>{todo?.content}</div>
            {addMilestone ? (
              <div ref={milestoneRef}>
                <MileStoneForm />
              </div>
            ) : (
              <div
                onClick={() => setAddMilestone(true)}
                className="self-center cursor-pointer mt-10"
              >
                <AiFillPlusCircle fill="white" className="h-10 w-10" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MileStone;
