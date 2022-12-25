import { useEffect, useState } from 'react';
import { RiTimerLine } from 'react-icons/ri';
import { FiBell, FiBellOff } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import moment from 'moment';
const DatePicker = dynamic(() => import('react-datepicker'));
import 'react-datepicker/dist/react-datepicker.css';
import {
  RootState,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import { batch } from 'react-redux';
import { isOnline } from '../../../utilities/isOnline';
import { changeTaskImportantState } from '../../../redux/slices/features/fireBaseActions/changeTaskImportantStateSlice';
import {
  addTaskDueDateLocally,
  changeTaskImportantStateLocally,
} from '../../../redux/slices/features/getTasksSlice';
import { addTaskDueDate } from '../../../redux/slices/features/fireBaseActions/addTaskDueDate';
import { toggleIsNotImportant } from '../../../redux/slices/features/isNotImportant';
import useWindowSize from '../../../hooks/useWindowsSize';

const DueTaskModal = ({
  tasks,
  task,
  user,
}: {
  tasks: SingleTaskInterface[];
  task: SingleTaskInterface;
  user: string;
}) => {
  const [timerIconHover, setTimerIconHover] = useState<boolean>(false);
  const [showDueDateModal, setShowDueDateModal] = useState<boolean>(false);
  const [showDueDateModalMobile, setShowDueDateModalMobile] =
    useState<boolean>(false);
  const [showFullDueDateModal, setShowFullDueDateModal] =
    useState<boolean>(false);
  const [dueAtDateCheck, setDueAtDateCheck] = useState<any>(false);
  const [dueText, setDueText] = useState<string>('');

  const vw = useWindowSize();

  const dispatch = useAppDispatch();
  const isNotImportant = useAppSelector(
    (state: RootState) => state.isNotImportantReducer.isNotImportant,
  );
  const dueDateFormatted = moment(task?.dueDate).format('MMM/DD hh:mm');

  useEffect(() => {
    setDueText(moment(task?.dueDate).fromNow());
  }, [task?.dueDate]);

  useEffect(() => {
    //Check date every 2s to see if the time is due and executes functions when certain time hits
    const checkDueTaskDateHandler = () => {
      if (
        moment(new Date().toISOString()).unix() * 1000 >=
        moment(task?.dueDate).unix() * 1000
      ) {
        //task is due
        setDueAtDateCheck(true);
        clearInterval(timer);
        dispatch(toggleIsNotImportant(false));
      } else if (
        moment(new Date().toISOString()).unix() * 1000 >=
        moment(task?.dueDate).unix() * 1000 - 7200000
      ) {
        //not due yet
        //Auto flag task to important before 2 hours from due time
        if (!task?.important && !isNotImportant) {
          batch(() => {
            if (isOnline()) {
              dispatch(
                changeTaskImportantState({
                  taskId: task?.id,
                  userUid: user,
                  allTasks: tasks,
                }),
              );
            }

            dispatch(changeTaskImportantStateLocally({ taskId: task?.id }));
          });
        }
        dispatch(toggleIsNotImportant(true));
        setDueAtDateCheck(false);
      } else {
        //not due yet
        setDueAtDateCheck(false);
      }
    };

    const timer = setInterval(() => {
      if (task?.dueDate) {
        checkDueTaskDateHandler();
      }
    }, 2000);

    if (!task?.dueDate) {
      setDueAtDateCheck(false);
    }

    return () => {
      clearInterval(timer);
    };
  }, [
    dispatch,
    isNotImportant,
    task?.dueDate,
    task?.id,
    task?.important,
    tasks,
    user,
  ]);

  const addDueDateHandler = (date: string) => {
    //add due date
    batch(() => {
      if (isOnline()) {
        dispatch(
          addTaskDueDate({
            taskId: task?.id,
            userUid: user,
            allTasks: tasks,
            dueDate: date,
          }),
        );
      }

      dispatch(addTaskDueDateLocally({ taskId: task?.id, dueDate: date }));
    });
  };

  const removeDueDateHanlder = () => {
    //remove due date and clear states
    addDueDateHandler('');
    setDueAtDateCheck(false);
    setShowDueDateModal(false);
    dispatch(toggleIsNotImportant(false));
  };

  useEffect(() => {
    if (task?.completed) {
      removeDueDateHanlder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task?.completed]);

  useEffect(() => {
    //show the remaining time and due date one after another in a modal to save space
    setTimeout(() => {
      if (showDueDateModalMobile && task?.dueDate) {
        setShowDueDateModalMobile(false);
        setShowFullDueDateModal(true);
        setShowDueDateModal(false);
      }
    }, 3000);

    if (showFullDueDateModal && task?.dueDate) {
      setTimeout(() => {
        setShowFullDueDateModal(false);
      }, 3000);
    }
  }, [showDueDateModalMobile, showFullDueDateModal, task?.dueDate]);

  return (
    <div className="relative ">
      {task?.dueDate ? (
        <div
          onMouseEnter={() => setShowDueDateModal(true)}
          onMouseLeave={() => setShowDueDateModal(false)}
          className="text-xs w-fit flex flex-row items-center justify-center"
        >
          {showDueDateModal ||
          showFullDueDateModal ||
          showDueDateModalMobile ? (
            <FiBellOff
              title="Clear due date"
              onClick={removeDueDateHanlder}
              className="semiSm:hover:text-white transition-all"
              size={vw > 840 ? 20 : 22}
              type="button"
            />
          ) : (
            <div
              className={`flex items-center justify-center ${
                dueAtDateCheck ? 'text-red-800 animate-pulse' : ''
              }`}
            >
              <span className="mr-2 hidden semiSm:block ">
                Due {dueDateFormatted}
              </span>

              <div>
                <FiBell
                  onClick={() => setShowDueDateModalMobile(true)}
                  className={`semiSm:hover:text-white  transition-all   ${
                    dueAtDateCheck ? 'bell' : ''
                  }`}
                  size={vw > 840 ? 20 : 22}
                  type="button"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          title="Add due date to task"
          className={`transition-all  ${
            timerIconHover ? 'semiSm:text-white' : ''
          } ${task?.completed ? 'opacity-60' : ''} `}
        >
          <RiTimerLine size={vw > 840 ? 21 : 24} />
        </div>
      )}

      <div
        onMouseEnter={() => setTimerIconHover(true)}
        onMouseLeave={() => setTimerIconHover(false)}
        className={`text-sm  absolute left-0 top-0 z-20`}
      >
        <DatePicker
          title="Add due date to task"
          className={`w-full text-center cursor-pointer outline-none bg-transparent caret-transparent  ${
            task?.dueDate || task?.completed ? 'hidden' : ''
          }`}
          value=""
          showTimeSelect
          timeFormat="HH:mm"
          onChange={(date: any) => addDueDateHandler(String(date))}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          timeIntervals={15}
        />
      </div>

      <div
        onMouseEnter={() => setShowDueDateModal(true)}
        onMouseLeave={() => setShowDueDateModal(false)}
        className={`hidden  bg-primaryLight bg-opacity-60 rounded w-[7rem] min-h-[2.5rem] absolute top-[-10px] left-0 translate-x-[-110%] text-[.7rem] flex-col items-center justify-center transition-all ${
          showDueDateModal ? 'semiSm:flex' : 'hidden'
        }`}
      >
        <span
          className={`text-center mt-1 ${
            dueAtDateCheck ? 'text-red-700' : ''
          } `}
        >
          Due {dueText}
        </span>
      </div>

      <div
        //Mobile due date display modal
        className={`semiSm:hidden bg-primaryLight bg-opacity-90  rounded w-[7rem] min-h-[2.5rem] absolute top-[-10px] left-[0px] translate-x-[-110%] text-[.7rem]  flex-col items-center justify-center transition-all ${
          (showDueDateModalMobile || showFullDueDateModal) && task?.dueDate
            ? 'flex'
            : 'hidden'
        }`}
      >
        <span
          className={`text-center mt-1 ${
            dueAtDateCheck ? 'text-red-700' : ''
          } ${showDueDateModalMobile ? 'flex semiSm:hidden' : 'hidden'}`}
        >
          Due {dueDateFormatted}
        </span>
        <span
          className={`text-center mt-1 ${
            dueAtDateCheck ? 'text-red-700' : ''
          } ${showFullDueDateModal ? 'flex' : 'hidden'}`}
        >
          {dueText}
        </span>
      </div>
      <style>{`.react-datepicker-popper{width:${
        vw >= 840 ? '34vh' : '40vh'
      }`}</style>
      <style>{`.react-datepicker-popper{width:${
        vw >= 330 ? '40vh' : '45vh'
      }`}</style>
    </div>
  );
};

export default DueTaskModal;
