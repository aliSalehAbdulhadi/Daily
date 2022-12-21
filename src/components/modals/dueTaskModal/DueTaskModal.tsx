import { useEffect, useState } from 'react';
import { RiTimerFill, RiTimerLine } from 'react-icons/ri';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { FiBell, FiBellOff } from 'react-icons/fi';
import { FillTarget } from 'chart.js';

const DueTaskModal = () => {
  const [timerIconHover, setTimerIconHover] = useState<boolean>(false);
  const [showDueDateModal, setShowDueDateModal] = useState<boolean>(false);
  const [startDate, setStartDate] = useState('');
  const [dueAt, setDueAt] = useState<string>('');

  const now = new Date();

  useEffect(() => {
    setDueAt(moment(startDate).fromNow());
  }, [startDate]);

  const dueDate = moment(startDate).format('MMM/DD hh:mm ');

  return (
    <div className="relative">
      {startDate ? (
        <div
          onMouseEnter={() => setShowDueDateModal(true)}
          onMouseLeave={() => setShowDueDateModal(false)}
          className="text-xs w-fit flex flex-row items-center justify-center "
        >
          {showDueDateModal ? (
            <FiBellOff
              onClick={() => {
                setStartDate('');
                setShowDueDateModal(false);
              }}
              className="hover:text-white transition-all"
              size={20}
            />
          ) : (
            <div className="flex items-center justify-center">
              <span className="mr-2 ">Due {dueDate}</span>

              <FiBell
                className="hover:text-white  transition-all bell"
                size={20}
              />
            </div>
          )}
        </div>
      ) : (
        <div
          className={`transition-all  ${timerIconHover ? 'text-white' : ''}`}
        >
          <RiTimerFill size={20} />
        </div>
      )}

      <div
        onMouseEnter={() => setTimerIconHover(true)}
        onMouseLeave={() => setTimerIconHover(false)}
        className={`text-sm rounded absolute z-40 left-0 top-0`}
      >
        <div className="w-full">
          <DatePicker
            className={`w-full text-center rounded-b cursor-pointer outline-none bg-transparent caret-transparent ${
              startDate ? 'hidden' : ''
            }`}
            value=""
            showTimeSelect
            timeFormat="HH:mm"
            onChange={(date: any) => setStartDate(date)}
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={now}
            timeIntervals={15}
          />
        </div>
      </div>

      <div
        onMouseEnter={() => setShowDueDateModal(true)}
        onMouseLeave={() => setShowDueDateModal(false)}
        className={` bg-primaryLight rounded w-[7rem] h-[4rem] absolute top-[-10px] left-0 translate-x-[-110%] text-xs z-40 flex-col items-center justify-center transition-all ${
          showDueDateModal ? 'flex' : 'hidden'
        }`}
      >
        <span className="text-center">Due {dueAt}</span>
      </div>
    </div>
  );
};

export default DueTaskModal;
