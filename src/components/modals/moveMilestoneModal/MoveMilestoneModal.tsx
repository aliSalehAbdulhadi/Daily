import { MdClose } from 'react-icons/md';
import { Dispatch, SetStateAction } from 'react';
import {
  RootState,
  singleMilestoneInterface,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import { toggleOpenMoveMilestone } from '../../../redux/slices/features/openMoveMilestoneSlice';
import SingleMoveTaskCard from '../../singleMoveTaskCard/SingleMoveTaskCard';
import ErrorMessage from '../../errorMessage/ErrorMessage';

const MoveMilestoneModal = ({
  taskId,
  tasks,
  user,
  setMoveMilestoneModal,
}: {
  taskId: string;
  tasks: SingleTaskInterface[];
  user: string;
  setMoveMilestoneModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const moveToTasks: SingleTaskInterface[] = tasks.filter(
    (task) => task.id !== taskId,
  );

  //@ts-ignore
  const milestone: singleMilestoneInterface = useAppSelector(
    (state: RootState) => state.selectedMilestoneReducer.selectedMilestone,
  );
  const dispatch = useAppDispatch();

  return (
    <div className="rounded hidden semiSm:flex flex-col bg-primaryLight bg-opacity-90  w-[300px] semiSm:w-[350px] h-[290px]  shadow-lg">
      <div className="flex items-center justify-end shadow-sm  w-full    cursor-pointer py-[.35rem]">
        <div onClick={() => setMoveMilestoneModal(false)} className=" mr-5">
          <MdClose className=" text-textLight hover:text-red-400" size={20} />
        </div>
      </div>
      <div className=" overflow-auto scrollBar overflow-x-hidden semiSm:mt-1">
        {moveToTasks?.length > 0 ? (
          moveToTasks?.map((task) => {
            return (
              <div className="taskCompPc" key={task.id}>
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
          <div className={`mt-[6rem] text-black opacity-70`}>
            <ErrorMessage
              message="There are no tasks to display."
              type="noTasks"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MoveMilestoneModal;
