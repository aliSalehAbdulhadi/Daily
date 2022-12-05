import { MdClose } from 'react-icons/md';
import {
  RootState,
  singleMilestoneInterface,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import { toggleOpenMoveMilestone } from '../../../redux/slices/features/openMoveMilestoneSlice';
import SingleMoveTaskCard from '../../singleMoveTaskCard/SingleMoveTaskCard';

const MoveMilestoneModal = ({
  taskId,
  tasks,
  user,
}: {
  taskId: string;
  tasks: SingleTaskInterface[];
  user: string;
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
    <div className="rounded hidden semiSm:flex flex-col bg-white bg-opacity-80 w-[300px] semiSm:w-[350px] h-[290px]  shadow-lg">
      <div
        onClick={() => dispatch(toggleOpenMoveMilestone(false))}
        className="flex items-center justify-end shadow-sm  w-full h-full   cursor-pointer py-[.35rem]"
      >
        <div className=" mr-5">
          <MdClose className=" text-textLight hover:text-red-400" size={22} />
        </div>
      </div>
      <div className=" overflow-auto scrollBar overflow-x-hidden">
        {moveToTasks.map((task) => {
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
        })}
      </div>
    </div>
  );
};

export default MoveMilestoneModal;
