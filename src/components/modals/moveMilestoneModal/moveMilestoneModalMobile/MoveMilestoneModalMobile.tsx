import useClickOutside from '../../../../hooks/useClickOutside';
import {
  SingleTaskInterface,
  useAppDispatch,
} from '../../../../interfaces/interfaces';
import { toggleOpenMoveMilestone } from '../../../../redux/slices/features/openMoveMilestoneSlice';
import { Dark } from '../../../../utilities/globalImports';

import SingleMoveTaskCard from '../../../singleMoveTaskCard/SingleMoveTaskCard';

const MoveMilestoneModalMobile = ({
  taskId,
  milestone,
  tasks,
}: {
  taskId: any;
  milestone: any;
  tasks: SingleTaskInterface[];
}) => {
  const dispatch = useAppDispatch();

  const openMoveModalRef = useClickOutside(() => {
    dispatch(toggleOpenMoveMilestone(false));
  });


  const moveToTasks: SingleTaskInterface[] = tasks?.filter(
    (task) => task.id !== taskId,
  );

  const dark = Dark();
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
                tasks={tasks}
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
