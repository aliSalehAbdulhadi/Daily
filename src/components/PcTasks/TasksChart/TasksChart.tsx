import moment from 'moment';
import { useEffect, useState, useMemo, useCallback, memo } from 'react';
import {
  RootState,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import { deleteTaskDate } from '../../../redux/slices/features/fireBaseActions/addTasksDates';
import { deleteTaskDateLocally } from '../../../redux/slices/features/getTasksSlice';
import { ImportantTasks, UserKey } from '../../../utilities/globalImports';
import Chart from './Chart/Chart';

const TasksChart = ({
  pendingTasks,
  completedTasks,
  tasks,
}: {
  pendingTasks: SingleTaskInterface[];
  completedTasks: SingleTaskInterface[];
  tasks: SingleTaskInterface[];
}) => {
  const dispatch = useAppDispatch();
  const user = UserKey();
  const allTasksCount = useAppSelector(
    (state: RootState) => state.getTaskReducer?.allTasksCount,
  );
  const importantTasks = ImportantTasks();

  const tasksDates = useAppSelector(
    (state: RootState) => state.getTaskReducer?.tasksDates,
  );
  console.log(allTasksCount);
  let totalMilestones = 0;
  tasks?.forEach((task) => {
    totalMilestones = totalMilestones + task.milestones?.length;
  });

  const now = useMemo(() => {
    return new Date();
  }, []);

  const days = 15;
  const daysNames: string[] = [];
  for (let i = 0; i < days; i++) {
    daysNames?.push(moment(moment().subtract(i, 'days')).format('MMM-DD'));
  }

  const tasksPerDay = daysNames?.map((day: string) => {
    let taskCountPerDay = 0;

    tasksDates?.forEach((TaskDate: { id: string; date: string }) => {
      day === moment(TaskDate.date).format('MMM-DD') ? taskCountPerDay++ : '';
    });

    return taskCountPerDay;
  });

  const [data, setData] = useState({
    labels: daysNames.reverse(),
    datasets: [
      {
        label: 'Tasks added per day',
        data: tasksPerDay.reverse(),
        backgroundColor: ['white'],
      },
    ],
  });

  useEffect(() => {
    setData({
      ...data,
      datasets: [
        {
          label: 'Tasks added per day',
          data: tasksPerDay,
          backgroundColor: ['white'],
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksDates]);

  const removeDateHandler = useCallback(
    (id: string) => {
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
    },
    [dispatch, tasksDates, user],
  );

  const calcLessThanDate = useCallback(
    (day: number) => {
      //delete tasksDates that is older than 30 days
      return tasksDates?.filter((taskDate: { date: string; id: string }) => {
        const pastTime = new Date(taskDate?.date);

        const thirtyDaysInMs = day * 24 * 60 * 60 * 1000;

        const timeDiffInMs = +now.getTime() - +pastTime.getTime();
        if (timeDiffInMs >= thirtyDaysInMs) {
          //'Date is older than 30 days'
          removeDateHandler(taskDate?.id);
        } else {
          //'Date is not older than 30 days'
          return taskDate;
        }
      });
    },
    [now, removeDateHandler, tasksDates],
  );

  const lessThanMonth = calcLessThanDate(30);

  const lessThanWeek = calcLessThanDate(7);

  return (
    <div className="h-[88.3vh]  bg-opacity-30  flex flex-col  text-white opacity-90 text-[.9rem]">
      <div className="h-[4.5vh] "></div>
      <div className=" self-center h-[40%]">
        <Chart chartData={data} />
      </div>
      <div className="flex flex-col mt-10 border-y-[1px] py-5">
        <div className="flex items-center justify-between self-center semiSm:ml-[2rem] md:ml-[3rem] semiSm:w-[66%]">
          <span className="text-base">Current tasks overview</span>
        </div>
        <div className="flex flex-col items-center semiSm:items-start  semiSm:ml-[2rem] md:ml-[3rem] mt-8">
          <div className="flex items-center justify-between w-[75%]">
            <span>Total tasks: </span>
            <span>{tasks?.length}</span>
          </div>
          <div className="flex items-center justify-between w-[75%] my-2">
            <span>Pending tasks: </span>
            {pendingTasks?.length > 0 ? pendingTasks.length : 0}
          </div>
          <div className="flex items-center justify-between w-[75%] mb-2">
            <span>Completed tasks: </span>
            <span>
              {completedTasks?.length > 0 ? completedTasks.length : 0}
            </span>
          </div>
          <div className="flex items-center justify-between w-[75%]">
            <span>Important tasks: </span>
            <span>{importantTasks?.length}</span>
          </div>
          <div className="flex items-center mt-2 justify-between w-[75%]">
            <span>Total milestones: </span>
            <span>{totalMilestones}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col mb-2 semiSm:mb-0">
        <div className="flex items-center self-center justify-between semiSm:ml-[2rem] md:ml-[3rem] semiSm:w-[65%]">
          <span className="text-base">Overall tasks overview</span>
        </div>

        <div className="flex flex-col items-center semiSm:items-start  semiSm:ml-[2rem] md:ml-[3rem] mt-8">
          <div className="flex items-center justify-between w-[75%]">
            <span>Tasks added last 7 days: </span>
            <span>{lessThanWeek?.length > 0 ? lessThanWeek?.length : 0}</span>
          </div>
          <div className="flex items-center justify-between w-[75%] my-2">
            <span>Tasks added last 30 days: </span>
            <span>{lessThanMonth?.length > 0 ? lessThanMonth?.length : 0}</span>
          </div>
          <div className="flex items-center justify-between w-[75%]">
            <span>Total tasks added: </span>
            <span>{allTasksCount > 0 ? allTasksCount : 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TasksChart);
