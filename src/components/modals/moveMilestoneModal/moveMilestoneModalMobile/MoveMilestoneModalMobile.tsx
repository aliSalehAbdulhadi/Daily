import React from 'react';
import useClickOutside from '../../../../hooks/useClickOutside';
import {
  RootState,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../../../interfaces/interfaces';
import { toggleOpenMoveMilestone } from '../../../../redux/slices/features/openMoveMilestoneSlice';
import { Tasks } from '../../../../utilities/globalImports';
import SingleMoveTaskCard from '../../../singleMoveTaskCard/SingleMoveTaskCard';

const MoveMilestoneModalMobile = ({
  taskId,
  milestone,
}: {
  taskId: any;
  milestone: any;
}) => {
  const dispatch = useAppDispatch();

  const openMoveModalRef = useClickOutside(() => {
    dispatch(toggleOpenMoveMilestone(false));
  });

  const tasks: SingleTaskInterface[] = Tasks();

  const moveToTasks: SingleTaskInterface[] = tasks?.filter(
    (task) => task.id !== taskId,
  );

  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  return (
    <div className="flex items-center">
      <div
        ref={openMoveModalRef}
        className={`h-screen w-[78%]  ${
          dark ? 'bg-black' : 'bg-white'
        } bg-opacity-40 py-6 overflow-auto`}
      >
        {moveToTasks?.map((task) => {
          return (
            <div className="taskCompPc " key={task.id}>
              <SingleMoveTaskCard
                moveToTask={task}
                taskId={taskId}
                milestone={milestone}
              />
            </div>
          );
        })}
      </div>
      <div className="bg-black opacity-30 h-screen w-[35%]"></div>
    </div>
  );
};

export default MoveMilestoneModalMobile;
