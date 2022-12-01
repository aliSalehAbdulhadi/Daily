import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../interfaces/interfaces';
import { deleteTaskDate } from '../redux/slices/features/fireBaseActions/addTasksDates';
import { deleteTaskDateLocally } from '../redux/slices/features/getTasksSlice';
import { UserKey } from './globalImports';

export const CheckDate = () => {
  // const dispatch = useAppDispatch();
  // const user = UserKey();
  // const tasksDates = useAppSelector(
  //   (state: RootState) => state.getTaskReducer?.tasksDates,
  // );

  // const removeDateHandler = (id: string) => {
  //   dispatch(
  //     deleteTaskDate({
  //       userUid: user,
  //       allTasksDates: tasksDates,
  //       dateId: id,
  //     }),
  //   );

  //   dispatch(
  //     deleteTaskDateLocally({
  //       dateId: id,
  //     }),
  //   );
  // };

  // tasksDates.filter((taskDate: { date: any; id: string }) => {
  //   const pastTime = new Date(taskDate?.date);
  //   const now = new Date();

  //   const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

  //   const timeDiffInMs = +now.getTime() - +pastTime.getTime();
  //   if (timeDiffInMs >= thirtyDaysInMs) {
  //     console.log('Date is older than 7 days');
  //     removeDateHandler(taskDate?.id);
  //   } else {
  //     console.log('Date is not older than 7 days');
  //   }
  // });
};
