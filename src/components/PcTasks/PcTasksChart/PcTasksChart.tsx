import { FaHistory } from 'react-icons/fa';
import { RiMapPinTimeLine } from 'react-icons/ri';
import {
  RootState,
  SingleTaskInterface,
  useAppSelector,
} from '../../../interfaces/interfaces';

const PcTasksChart = ({
  pendingTasks,
  completedTasks,
  tasks,
}: {
  pendingTasks: SingleTaskInterface[];
  completedTasks: SingleTaskInterface[];
  tasks: SingleTaskInterface[];
}) => {
  const allTasksCount = useAppSelector(
    (state: RootState) => state.getTaskReducer?.allTasksCount,
  );

  return (
    <div className="h-[88.3vh] bg-blue-100 bg-opacity-20 flex flex-col text-white opacity-90 text-[.9rem]">
      <div className="mt-[8rem] self-center">chart graph</div>
      <div className="flex flex-col mt-[15rem] border-y-[1px] py-5">
        <div className="flex items-center justify-between ml-[2rem] w-[69%]">
          <span className="text-base">Current tasks overview</span>
          <RiMapPinTimeLine className=" mb-1" size={22} />
        </div>
        <div className="flex flex-col mt-8 ml-[2rem] ">
          <div className="flex items-center justify-between w-[75%]">
            <span>Total tasks: </span>
            <span>{tasks?.length}</span>
          </div>
          <div className="flex items-center justify-between w-[75%] my-2">
            <span>Pending tasks: </span>
            <span>{pendingTasks?.length}</span>
          </div>
          <div className="flex items-center justify-between w-[75%]">
            <span>Completed tasks: </span>
            <span>{completedTasks?.length}</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between ml-[2rem] w-[69%]">
          <span className="text-base">Overall tasks overview</span>
          <FaHistory className=" mb-1" size={19} />
        </div>

        <div className="flex flex-col ml-[2rem] mt-8">
          <div className="flex items-center justify-between w-[75%]">
            <span>Total tasks added this week: </span>
            <span>50</span>
          </div>
          <div className="flex items-center justify-between w-[75%] my-2">
            <span>Total tasks added this Month: </span>
            <span>50</span>
          </div>
          <div className="flex items-center justify-between w-[75%]">
            <span>Total tasks added: </span>
            <span>{allTasksCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PcTasksChart;
