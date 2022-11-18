import React from 'react';
import {
  RootState,
  singleMilestoneInterface,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import { toggleOpenMoveMilestone } from '../../../redux/slices/features/openMoveMilestoneSlice';
import { Tasks } from '../../../utilities/EncryptedData';
import SingleMoveTaskCard from '../../singleMoveTaskCard/SingleMoveTaskCard';

const MoveMilestoneModal = ({ taskId }: { taskId: string }) => {
  const tasks: SingleTaskInterface[] = Tasks()

  const moveToTasks: SingleTaskInterface[] = tasks.filter(
    (task) => task.id !== taskId,
  );

  //@ts-ignore
  const milestone: singleMilestoneInterface = useAppSelector(
    (state: RootState) => state.selectedMilestoneReducer.selectedMilestone,
  );
  const dispatch = useAppDispatch();

  return (
    <div className="rounded flex flex-col bg-white bg-opacity-80 w-[300px] semiSm:w-[350px] h-[290px] my-5 overflow-auto scrollBar py-2 overflow-x-hidden shadow-lg">
      <div
        onClick={() => dispatch(toggleOpenMoveMilestone(false))}
        className="self-end mr-6 mb-3 mt-1 text-red-500 cursor-pointer"
      >
        X
      </div>
      <div>
        {moveToTasks.map((task) => {
          return (
            <div className="taskCompPc" key={task.id}>
              <SingleMoveTaskCard
                moveToTask={task}
                taskId={taskId}
                milestone={milestone}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoveMilestoneModal;
