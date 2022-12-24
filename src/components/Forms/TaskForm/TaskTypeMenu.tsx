import { SyntheticEvent, useEffect, useState } from 'react';
import { IoColorFill } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
//@ts-ignore
import SwiperCore, { Keyboard, Mousewheel } from 'swiper/core';
import useClickOutside from '../../../hooks/useClickOutside';
import {
  SingleTaskInterface,
  useAppDispatch,
} from '../../../interfaces/interfaces';
import { addTaskType } from '../../../redux/slices/features/fireBaseActions/addTaskTypeSlice';
import { addTaskTypeLocally } from '../../../redux/slices/features/getTasksSlice';
import { toggleDisableSwiper } from '../../../redux/slices/features/disableSwiperSlice';
import { isOnline } from '../../../utilities/isOnline';
import 'swiper/css';
import { toggleDisableDragDnd } from '../../../redux/slices/features/disableDragDndSlice';
import { batch } from 'react-redux';

const TaskTypeMenu = ({
  task,
  isVertical,
  tasks,
  user,
}: {
  tasks: SingleTaskInterface[];
  task: SingleTaskInterface;
  isVertical: boolean;
  user: string;
}) => {
  SwiperCore.use([Keyboard, Mousewheel]);
  const [hidden, setHidden] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  let domNode = useClickOutside(() => {
    setHidden(true);
  });
  const iconsHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;

    batch(() => {
      if (isOnline()) {
        dispatch(
          addTaskType({
            userUid: user,
            taskId: task?.id,
            allTasks: tasks,
            taskType: target.value,
          }),
        );
      }

      dispatch(
        addTaskTypeLocally({ taskId: task?.id, taskType: target.value }),
      );
    });
    setHidden(true);
  };

  useEffect(() => {
    dispatch(toggleDisableSwiper(!hidden));
    hidden
      ? dispatch(toggleDisableDragDnd(false))
      : dispatch(toggleDisableDragDnd(true));
  }, [dispatch, hidden]);

  return (
    <div
      ref={domNode}
      className={` flex semiSm:flex-col items-center justify-center `}
    >
      <button
        disabled={task?.completed}
        type="button"
        className={`self-end transition-all ease-in-out ${
          task?.completed ? '' : 'semiSm:hover:text-white '
        }`}
        onClick={() => setHidden(false || task?.completed)}
      >
        <IoColorFill
          size={20}
          title="Task Color"
          className={`${!hidden ? 'hidden' : 'block'} `}
        />
      </button>

      <div className={`${hidden ? 'hidden' : 'block'}`}>
        <Swiper
          spaceBetween={0}
          navigation
          slidesPerView={isVertical ? 3.3 : 4.2}
          direction={isVertical ? 'vertical' : 'horizontal'}
          className={` ${
            isVertical ? 'h-[5.5rem] w-8' : 'w-[10rem] h-7'
          } bg-primaryLight rounded`}
          mousewheel={true}
          speed={200}
        >
          <SwiperSlide>
            <button
              type="button"
              className="flex justify-end semiSm:ml-[.35rem] semiSm:hover:text-white transition-all ease-in-out"
              value="green-4"
              onClick={(e) => iconsHandler(e)}
            >
              <RiCheckboxBlankCircleFill
                size={isVertical ? 20 : 22}
                className={`pointer-events-none mt-[.19rem] semiSm:mt-0 semiSm:mr-0 semiSm:mb-2 fill-green-400 ${
                  hidden ? 'hidden' : 'block'
                } `}
              />
            </button>
          </SwiperSlide>

          <SwiperSlide>
            <button
              type="button"
              className="flex justify-end semiSm:ml-[.35rem] bg-  semiSm:hover:text-white transition-all ease-in-out"
              value="blue-4"
              onClick={(e) => iconsHandler(e)}
            >
              <RiCheckboxBlankCircleFill
                size={isVertical ? 20 : 22}
                className={`pointer-events-none mt-[.19rem] semiSm:mt-0 semiSm:mr-0 semiSm:mb-2 fill-blue-400 ${
                  hidden ? 'hidden' : 'block'
                } `}
              />
            </button>
          </SwiperSlide>

          <SwiperSlide>
            <button
              type="button"
              className="flex justify-end semiSm:ml-[.35rem] semiSm:hover:text-white transition-all ease-in-out"
              value="purple-4"
              onClick={(e) => iconsHandler(e)}
            >
              <RiCheckboxBlankCircleFill
                size={isVertical ? 20 : 22}
                className={`pointer-events-none mt-[.19rem] semiSm:mt-0 fill-purple-400
                  ${hidden ? 'hidden' : 'block'} `}
              />
            </button>
          </SwiperSlide>

          <SwiperSlide>
            <button
              type="button"
              className="flex justify-end semiSm:ml-[.35rem]  semiSm:hover:text-white transition-all ease-in-out"
              value="amber-2"
              onClick={(e) => iconsHandler(e)}
            >
              <RiCheckboxBlankCircleFill
                size={isVertical ? 20 : 22}
                className={`pointer-events-none mt-[.19rem] semiSm:mt-0 semiSm:mr-0 semiSm:mb-2 fill-amber-200 ${
                  hidden ? 'hidden' : 'block'
                } `}
              />
            </button>
          </SwiperSlide>

          <SwiperSlide>
            <button
              type="button"
              className="flex justify-end semiSm:ml-[.35rem]  semiSm:hover:text-white transition-all ease-in-out"
              value="salmon"
              onClick={(e) => iconsHandler(e)}
            >
              <RiCheckboxBlankCircleFill
                size={isVertical ? 20 : 22}
                className={`pointer-events-none mt-[.19rem] semiSm:mt-0 semiSm:mr-0 semiSm:mb-2 fill-[#e28780] ${
                  hidden ? 'hidden' : 'block'
                } `}
              />
            </button>
          </SwiperSlide>

          <SwiperSlide>
            <button
              type="button"
              className="flex justify-end semiSm:ml-[.35rem]  semiSm:hover:text-white transition-all ease-in-out"
              value="pink-4"
              onClick={(e) => iconsHandler(e)}
            >
              <RiCheckboxBlankCircleFill
                size={isVertical ? 20 : 22}
                className={`pointer-events-none mt-[.19rem] semiSm:mt-0 semiSm:mr-0 semiSm:mb-2 text-pink-400 ${
                  hidden ? 'hidden' : 'block'
                } `}
              />
            </button>
          </SwiperSlide>

          <SwiperSlide>
            <button
              type="button"
              className="flex justify-end semiSm:ml-[.35rem]  semiSm:hover:text-white transition-all ease-in-out"
              value="teal-4"
              onClick={(e) => iconsHandler(e)}
            >
              <RiCheckboxBlankCircleFill
                size={isVertical ? 20 : 22}
                className={`pointer-events-none mt-[.19rem] semiSm:mt-0 semiSm:mr-0 semiSm:mb-2 fill-teal-400 ${
                  hidden ? 'hidden' : 'block'
                } `}
              />
            </button>
          </SwiperSlide>

          <SwiperSlide>
            <button
              type="button"
              className="flex justify-end semiSm:ml-[.35rem]  semiSm:hover:text-white transition-all ease-in-out"
              value="emerald-5"
              onClick={(e) => iconsHandler(e)}
            >
              <RiCheckboxBlankCircleFill
                size={isVertical ? 20 : 22}
                className={`pointer-events-none mt-[.19rem] semiSm:mt-0 semiSm:mr-0 semiSm:mb-2 fill-emerald-500 ${
                  hidden ? 'hidden' : 'block'
                } `}
              />
            </button>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default TaskTypeMenu;
