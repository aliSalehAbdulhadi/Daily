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
import { hours } from '../../../utilities/globalImports';
import { TiArrowSortedUp } from 'react-icons/ti';
import useClickOutside from '../../../hooks/useClickOutside';

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
  const [dueDate, setDueDate] = useState<string>('');
  const [showDueDateModal, setShowDueDateModal] = useState<boolean>(false);
  const [showDueDateModalMobile, setShowDueDateModalMobile] =
    useState<boolean>(false);
  const [showFullDueDateModal, setShowFullDueDateModal] =
    useState<boolean>(false);
  const [dueAtDateCheck, setDueAtDateCheck] = useState<any>(false);
  const [dueText, setDueText] = useState<string>('');
  const [windowOfSetY, setWindowOfSetY] = useState<number>(0);
  const [isModalOnTop, setIsModalOnTop] = useState<boolean>();



  const vw = useWindowSize();

  const dispatch = useAppDispatch();
  const isNotImportant = useAppSelector(
    (state: RootState) => state.isNotImportantReducer.isNotImportant,
  );
  const dueDateFormatted = moment(task?.dueDate).format('MMM/DD hh:mm');
  const dateRef = useClickOutside(() => {
    setDueDate('');
  });

  const handleMouseMove = (event: any) => {
    // Calculate position within bounds of element
    const localX = event.clientX - event.target.offsetLeft;
    const localY = event.clientY - event.target.offsetTop;

    return setWindowOfSetY(localY);
  };

  const addDueDateHandler = (
    hour: string = '00:00:00',
    clearTimer: boolean = false,
  ) => {
    //add due date
    batch(() => {
      if (isOnline()) {
        dispatch(
          addTaskDueDate({
            taskId: task?.id,
            userUid: user,
            allTasks: tasks,
            dueDate: clearTimer
              ? ''
              : dueDate.replaceAll('00:00:00', `${hour}:00`),
          }),
        );
      }

      dispatch(
        addTaskDueDateLocally({
          taskId: task?.id,
          dueDate: clearTimer
            ? ''
            : dueDate.replaceAll('00:00:00', `${hour}:00`),
        }),
      );
    });
  };

  const removeDueDateHanlder = () => {
    //remove due date and clear states
    addDueDateHandler('', true);
    setDueAtDateCheck(false);
    setShowDueDateModal(false);
    dispatch(toggleIsNotImportant(false));
  };

  useEffect(() => {
    if (windowOfSetY && windowOfSetY - window?.innerHeight >= -300) {
      setIsModalOnTop(true);
    }
  }, [windowOfSetY]);

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
    <div className="relative " onMouseMove={(e) => handleMouseMove(e)}>
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
                dueAtDateCheck ? 'text-red-700 animate-pulse' : ''
              }`}
            >
              <span className="mr-2 hidden semiSm:block ">Due {dueText}</span>

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
        ref={dateRef}
      >
        <DatePicker
          title="Add due date to task"
          className={`w-full text-center cursor-pointer outline-none bg-transparent caret-transparent  ${
            task?.dueDate || task?.completed ? 'hidden' : ''
          }`}
          value=""
          onChange={(date: any) => setDueDate(String(date))}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          timeIntervals={15}
          disabled={dueDate?.length > 0}
        />

        <div
          className={`h-[14rem] w-[5rem] absolute  right-[-26px]  flex-col ${
            isModalOnTop ? 'top-[-241px]' : 'top-[31px]'
          } ${dueDate ? 'flex' : 'hidden'}`}
        >
          <TiArrowSortedUp
            size={30}
            className={`absolute left-[27px] z-[-5] text-white ${
              isModalOnTop ? 'bottom-[-18px] rotate-180' : 'top-[-17px] '
            }`}
          />
          <span className="text-center  w-full text-white bg-secondaryColor py-3 rounded-t border-x-[1px] border-t-[1px] border-white border-opacity-40 ">
            Time
          </span>
          <div className="overflow-auto scrollBar bg-primaryColor text-white rounded-b border-[1px] border-white border-opacity-40">
            {hours?.map((hour) => (
              <div
                key={hour}
                className=" text-center py-1 hover:bg-secondaryColor"
                onClick={() => {
                  addDueDateHandler(hour);
                  setDueDate('');
                }}
              >
                {hour}
              </div>
            ))}
          </div>
        </div>
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
          Due {dueDateFormatted}
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
    </div>
  );
};

export default DueTaskModal;
