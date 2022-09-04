import { useEffect, useState } from 'react';
import { MdWifiOff } from 'react-icons/md';
import { ClapSpinner } from 'react-spinners-kit';
import {
  RootState,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../interfaces/interfaces';
import { reArrangeFirebase } from '../../redux/slices/features/reArrangeTasksSlice';

const CheckInternet = () => {
  const [checkInternet, setCheckInternet] = useState<boolean>(true);
  const [uploadData, setUploadData] = useState<boolean>(false);
  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const dispatch = useAppDispatch();

  useEffect((): void => {
    window.ononline = () => {
      setCheckInternet(true);
      dispatch(reArrangeFirebase({ userUid: user, allTasks: tasks }));
      setUploadData(true);
      setTimeout(() => {
        setUploadData(false);
      }, 5000);
    };

    window.onoffline = () => {
      setCheckInternet(false);
    };
  }, [dispatch, tasks, user]);

  return (
    <div>
      {!checkInternet ? (
        <div className="flex mt-5 md:mt-0 justify-center items-center transition-all ease-in-out">
          <MdWifiOff
            type="button"
            className="cursor-pointer scale-[1.8] md:scale-[2] transition-all ease-in-out fill-red-600 animate-pulse"
          />
          <h1 className="text-red-300 ml-5 text-xs">
            Check your connection! <br /> Newly added tasks are saved locally.
          </h1>
        </div>
      ) : uploadData ? (
        <div className="flex items-center justify-center text-sm">
          Uploading data
          <div className="ml-1 scale-50">
            <ClapSpinner />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CheckInternet;
