import { useEffect, useState } from 'react';
import { RiTimerLine } from 'react-icons/ri';
import { FiBell, FiBellOff } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import moment from 'moment';
const DatePicker = dynamic(() => import('react-datepicker'));
import 'react-datepicker/dist/react-datepicker.css';
import {
  SingleTaskInterface,
  useAppDispatch,
} from '../../../interfaces/interfaces';
import { batch } from 'react-redux';
import { isOnline } from '../../../utilities/isOnline';
import { changeTaskImportantState } from '../../../redux/slices/features/fireBaseActions/changeTaskImportantStateSlice';
import {
  addTaskDueDateLocally,
  changeTaskImportantStateLocally,
} from '../../../redux/slices/features/getTasksSlice';
import { addTaskDueDate } from '../../../redux/slices/features/fireBaseActions/addTaskDueDate';

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
  const [dueAtDateCheck, setDueAtDateCheck] = useState<any>(false);
  const [dueText, setDueText] = useState<string>('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    setDueText(moment(task?.dueDate).fromNow());
  }, [task?.dueDate]);

  const dueDateFormatted = moment(task?.dueDate).format('MMM/DD hh:mm');

  useEffect(() => {
    const checkDueTaskDateHandler = () => {
      if (
        moment(new Date()).unix() * 1000 >=
        moment(task?.dueDate).unix() * 1000
      ) {
        //task is due
        setDueAtDateCheck(true);
        clearInterval(timer);
      } else if (
        moment(new Date()).unix() * 1000 >=
        moment(task?.dueDate).unix() * 1000 - 7200000
      ) {
        //not due yet
        //Auto flag task to important before 2 hours from due time
        if (!task?.important) {
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
  }, [dispatch, task?.dueDate, task?.id, task?.important, tasks, user]);

  const addDueDateHandler = (date: string) => {
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

  return (
    <div className="relative">
      {task?.dueDate ? (
        <div
          onMouseEnter={() => setShowDueDateModal(true)}
          onMouseLeave={() => setShowDueDateModal(false)}
          className="text-xs w-fit flex flex-row items-center justify-center "
        >
          {showDueDateModal ? (
            <FiBellOff
              onClick={() => {
                setDueAtDateCheck(false);
                setShowDueDateModal(false);
                addDueDateHandler('');
              }}
              className="hover:text-white transition-all"
              size={20}
            />
          ) : (
            <div
              className={`flex items-center justify-center ${
                dueAtDateCheck ? 'text-red-800 animate-pulse' : ''
              }`}
            >
              <span className="mr-2">Due {dueDateFormatted}</span>

              <FiBell
                className={`hover:text-white  transition-all  ${
                  dueAtDateCheck ? 'bell' : ''
                }`}
                size={20}
              />
            </div>
          )}
        </div>
      ) : (
        <div
          className={`transition-all  ${timerIconHover ? 'text-white' : ''}`}
        >
          <RiTimerLine size={21} />
        </div>
      )}

      <div
        onMouseEnter={() => setTimerIconHover(true)}
        onMouseLeave={() => setTimerIconHover(false)}
        className={`text-sm  absolute z-40 left-0 top-0`}
      >
        <DatePicker
          className={`w-full text-center cursor-pointer outline-none bg-transparent caret-transparent z-[99] ${
            task?.dueDate ? 'hidden' : ''
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
        className={` bg-primaryLight bg-opacity-60 rounded w-[7rem] min-h-[2.5rem] absolute top-[-10px] left-0 translate-x-[-110%] text-[.7rem] z-40 flex-col items-center justify-center transition-all ${
          showDueDateModal ? 'flex' : 'hidden'
        }`}
      >
        <span
          className={`text-center mt-1 ${dueAtDateCheck ? 'text-red-700' : ''}`}
        >
          Due {dueText}
        </span>
      </div>
    </div>
  );
};

export default DueTaskModal;
