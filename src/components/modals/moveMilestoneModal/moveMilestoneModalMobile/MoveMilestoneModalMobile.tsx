import useClickOutside from '../../../../hooks/useClickOutside';
import {
  SingleTaskInterface,
  useAppDispatch,
} from '../../../../interfaces/interfaces';
import { toggleOpenMoveMilestone } from '../../../../redux/slices/features/openMoveMilestoneSlice';
import { Dark } from '../../../../utilities/globalImports';
import ErrorMessage from '../../../errorMessage/ErrorMessage';

import SingleMoveTaskCard from '../../../singleMoveTaskCard/SingleMoveTaskCard';

const MoveMilestoneModalMobile = ({
  taskId,
  milestone,
  tasks,
  user,
}: {
  user: string;
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
    <div className="flex items-center ">
      <div
        ref={openMoveModalRef}
        className={`h-screen w-[78%] mobileMoveModal ${
          dark ? 'bg-black' : 'bg-white'
        } bg-opacity-40 py-6 overflow-auto`}
      >
        {moveToTasks?.length > 0 ? (
          moveToTasks?.map((task) => {
            return (
              <div className="taskCompPc " key={task.id}>
                <SingleMoveTaskCard
                  user={user}
                  tasks={tasks}
                  moveToTask={task}
                  taskId={taskId}
                  milestone={milestone}
                />
              </div>
            );
          })
        ) : (
          <div className={`mt-[13rem] xs:mt-[20rem] text-black text-center`}>
            <ErrorMessage
              message="There are no tasks to display."
              type="noTasks"
            />
          </div>
        )}
      </div>
      <div className="bg-black opacity-30 h-screen w-[35%] mobileMoveModalLayOut"></div>
    </div>
  );
};

export default MoveMilestoneModalMobile;
