import { useEffect, useState } from 'react';
import { MdWifiOff } from 'react-icons/md';
import { ClapSpinner } from 'react-spinners-kit';
import {
  RootState,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../interfaces/interfaces';
import { reArrangeFirebase } from '../../redux/slices/features/fireBaseActions/reArrangeTasksSlice';
import {
  uploadLocalDataResetStatus,
  uploadLocalData,
} from '../../redux/slices/features/fireBaseActions/uploadLocalData';
import { isOnline } from '../../utilities/isOnline';
import {UserKey} from '../../utilities/EncryptedData';

const CheckInternet = () => {
  const [checkInternet, setCheckInternet] = useState<boolean>(true);
  const [uploadData, setUploadData] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );
  const user = UserKey();

  const uploadLocalDataStatus = useAppSelector(
    (state: RootState) => state.uploadLocalDataReducer.state,
  );

  useEffect(() => {
    if (showErrorMessage) {
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showErrorMessage]);

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
      dispatch(uploadLocalData({ userUid: user, allTasks: tasks }));
      dispatch(reArrangeFirebase({ userUid: user, allTasks: tasks }));

      setUploadData(true);
    };

    window.onoffline = () => {
      setCheckInternet(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, user]);

  return (
    <div>
      {!checkInternet || !isOnline() ? (
        <div>
          <div
            className={`flex mt-5 md:mt-0 justify-center items-center transition-all ease-in-out relative`}
          >
            <MdWifiOff
              onClick={() => setShowErrorMessage(true)}
              type="button"
              className="cursor-pointer scale-[1.5] transition-all ease-in-out fill-red-600 animate-pulse absolute left-1 semiSm:left-0"
            />
            <h1
              className={`text-red-500 text-xs scale-75 semiSm:ml-5 semiSm:scale-100 border-[1px] p-3 rounded absolute  top-0 left-0 semiSm:left-5 z-40 bg-white ${
                showErrorMessage ? 'visible' : 'invisible'
              }`}
            >
              Check your connection! <br /> Newly added tasks are saved locally.
            </h1>
          </div>
        </div>
      ) : uploadData ? (
        <div className="flex items-center justify-center text-xs semiSm:text-sm absolute top-[1.8rem] xxxl:top-9">
          <h1>Syncing</h1>
          <div className="ml-1 scale-50">
            <ClapSpinner />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CheckInternet;
