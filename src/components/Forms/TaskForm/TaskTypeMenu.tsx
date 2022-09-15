import { SyntheticEvent, useEffect, useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdPark, MdWork } from 'react-icons/md';
import { IoGameController } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaShoppingCart, FaUserFriends } from 'react-icons/fa';
import { CgGym } from 'react-icons/cg';
//@ts-ignore
import SwiperCore, { Keyboard, Mousewheel } from 'swiper/core';
import useClickOutside from '../../../hooks/useClickOutside';
import {
  RootState,
  SingleTaskInterface,
  useAppDispatch,
  useAppSelector,
} from '../../../interfaces/interfaces';
import { addTaskType } from '../../../redux/slices/features/addTaskTypeSlice';
import { addTaskTypeLocally } from '../../../redux/slices/features/getTasksSlice';
import { dynamicIconHandler } from '../../../utilities/dynamicIconHandler';

const TaskTypeMenu = ({
  task,
  isVertical,
}: {
  task: SingleTaskInterface;
  isVertical: boolean;
}) => {
  SwiperCore.use([Keyboard, Mousewheel]);
  const [hidden, setHidden] = useState<boolean>(true);
  const [value, setValue] = useState<string>(task?.taskType);
  const dispatch = useAppDispatch();
  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  let domNode = useClickOutside(() => {
    setHidden(true);
  });
  const iconsHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    setValue(target.value);
    setHidden(true);
  };

  useEffect(() => {
    dispatch(
      addTaskType({
        userUid: user,
        taskId: task?.id,
        allTasks: tasks,
        taskType: value,
      }),
    );
    dispatch(addTaskTypeLocally({ taskId: task?.id, taskType: value }));
  }, [value]);

  return (
    <div
      ref={domNode}
      className={` flex semiSm:flex-col items-center justify-center semiSm:h-[3rem]`}
    >
      <button
        disabled={task?.completed}
        type="button"
        className={`self-end transition-all ease-in-out ${
          task?.completed ? '' : 'semiSm:hover:text-white '
        }`}
        onClick={() => setHidden(false || task?.completed)}
      >
        {dynamicIconHandler(value, hidden)}
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
          speed={100}
        >
          <SwiperSlide>
            <button
              type="button"
              className="flex justify-end semiSm:ml-[.35rem] semiSm:hover:text-white transition-all ease-in-out"
              value="personal"
              onClick={(e) => iconsHandler(e)}
            >
              <BsFillPersonFill
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
              className="flex justify-end semiSm:ml-[.35rem]  semiSm:hover:text-white transition-all ease-in-out"
              value="work"
              onClick={(e) => iconsHandler(e)}
            >
              <MdWork
                size={isVertical ? 20 : 22}
                className={`pointer-events-none mt-[.19rem] semiSm:mt-0 semiSm:mr-0 semiSm:mb-2   fill-blue-400 ${
                  hidden ? 'hidden' : 'block'
                } `}
              />
            </button>
          </SwiperSlide>

          <SwiperSlide>
            <button
              type="button"
              className="flex justify-end semiSm:ml-[.35rem] semiSm:hover:text-white transition-all ease-in-out"
              value="fun"
              onClick={(e) => iconsHandler(e)}
            >
              <IoGameController
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
              value="gym"
              onClick={(e) => iconsHandler(e)}
            >
              <CgGym
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
              value="friends"
              onClick={(e) => iconsHandler(e)}
            >
              <FaUserFriends
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
              value="shopping"
              onClick={(e) => iconsHandler(e)}
            >
              <FaShoppingCart
                size={isVertical ? 20 : 22}
                className={`pointer-events-none mt-[.19rem] semiSm:mt-0 semiSm:mr-0 semiSm:mb-2 fill-[#F88379] ${
                  hidden ? 'hidden' : 'block'
                } `}
              />
            </button>
          </SwiperSlide>

          <SwiperSlide>
            <button
              type="button"
              className="flex justify-end semiSm:ml-[.35rem]  semiSm:hover:text-white transition-all ease-in-out"
              value="nature"
              onClick={(e) => iconsHandler(e)}
            >
              <MdPark
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
