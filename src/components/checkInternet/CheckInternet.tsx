import { useEffect, useState } from 'react';
import { MdWifiOff } from 'react-icons/md';
import { ClapSpinner } from 'react-spinners-kit';
import {
  RootState,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../interfaces/interfaces';
import {
  uploadLocalDataResetStatus,
  uploadLocalData,
} from '../../redux/slices/features/uploadLocalData';
import { isOnline } from '../../utilities/isOnline';

const CheckInternet = () => {
  const [checkInternet, setCheckInternet] = useState<boolean>(true);
  const [uploadData, setUploadData] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const localTasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const uploadLocalDataStatus = useAppSelector(
    (state: RootState) => state.uploadLocalDataReducer.state,
  );

  useEffect(() => {
    dispatch(uploadLocalDataResetStatus());
  }, [dispatch]);

  useEffect(() => {
    if (uploadLocalDataStatus === 'fulfilled') {
      setUploadData(false);
      dispatch(uploadLocalDataResetStatus());
      setTimeout(() => {
        location.reload();
      }, 200);
    }
  }, [uploadLocalDataStatus, dispatch]);

  useEffect((): void => {
    window.ononline = () => {
      setCheckInternet(true);
      dispatch(uploadLocalData({ userUid: user, allTasks: localTasks }));
      setUploadData(true);
    };

    window.onoffline = () => {
      setCheckInternet(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localTasks, user]);

  return (
    <div>
      {!checkInternet || !isOnline() ? (
        <div>
          <div
            className={`flex mt-5 md:mt-0 justify-center items-center transition-all ease-in-out`}
          >
            <MdWifiOff
              type="button"
              className="cursor-pointer scale-[1.7] md:scale-[2] transition-all ease-in-out fill-red-600"
            />
            <h1 className="text-red-300 text-xs scale-75 semiSm:ml-5 semiSm:scale-100">
              Check your connection! <br /> Newly added tasks are saved locally.
            </h1>
          </div>
        </div>
      ) : uploadData ? (
        <div className="flex items-center justify-center text-xs semiSm:text-sm mt-5 semiSm:mt-1">
          <h1>Uploading data</h1>
          <div className="ml-1 scale-50">
            <ClapSpinner />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CheckInternet;
