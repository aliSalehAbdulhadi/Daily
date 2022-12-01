import { FaHistory } from 'react-icons/fa';
import { RiMapPinTimeLine } from 'react-icons/ri';
import {
  RootState,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import { deleteTaskDate } from '../../../redux/slices/features/fireBaseActions/addTasksDates';
import { deleteTaskDateLocally } from '../../../redux/slices/features/getTasksSlice';
import { UserKey } from '../../../utilities/globalImports';

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

  const dispatch = useAppDispatch();
  const user = UserKey();
  const tasksDates = useAppSelector(
    (state: RootState) => state.getTaskReducer?.tasksDates,
  );

  const removeDateHandler = (id: string) => {
    dispatch(
      deleteTaskDate({
        userUid: user,
        allTasksDates: tasksDates,
        dateId: id,
      }),
    );

    dispatch(
      deleteTaskDateLocally({
        dateId: id,
      }),
    );
  };

  const now = new Date();

  const lessThanMonth = tasksDates?.filter(
    (taskDate: { date: any; id: string }) => {
      const pastTime = new Date(taskDate?.date);

      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

      const timeDiffInMs = +now.getTime() - +pastTime.getTime();
      if (timeDiffInMs >= thirtyDaysInMs) {
        //'Date is older than 30 days'
        removeDateHandler(taskDate?.id);
      } else {
        //'Date is not older than 30 days'
        return taskDate;
      }
    },
  );

  const lessThanWeek = tasksDates?.filter(
    (taskDate: { date: any; id: string }) => {
      const pastTime = new Date(taskDate?.date);

      const thirtyDaysInMs = 7 * 24 * 60 * 60 * 1000;

      const timeDiffInMs = +now?.getTime() - +pastTime?.getTime();
      if (timeDiffInMs >= thirtyDaysInMs) {
      } else {
        return taskDate;
      }
    },
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
            <span>Tasks added last 7 days: </span>
            <span>{lessThanWeek?.length}</span>
          </div>
          <div className="flex items-center justify-between w-[75%] my-2">
            <span>Tasks added last 30 days: </span>
            <span>{lessThanMonth?.length}</span>
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
