import React, { ReactChildren, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import { deleteMilestoneLocally } from '../../redux/slices/features/getTodoSlice';
import { deleteMilestone } from '../../redux/slices/features/MilestonesSlice';
import {
  RootState,
  SingleTodoInterface,
  useAppDispatch,
  useAppSelector,
} from '../../interfaces/interfaces';

const Swipeable = ({
  children,
  taskId,
  milestone,
  todos,
}: {
  children: JSX.Element;
  taskId: any;
  milestone: any;
  todos: SingleTodoInterface[];
}) => {
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );
  const [bgColor, setBgColor] = useState(`${dark ? '#427676' : '#56a691'}`);
  const dispatch = useAppDispatch();
  const todo = todos?.find((todo) => todo?.id === taskId);
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const handlers = useSwipeable({
    delta: { left: 500 },
    swipeDuration: 3000,
    onSwipedLeft: () => {
      dispatch(
        deleteMilestone({
          milestone: milestone,
          userUid: user,
          todoId: todo?.id,
          allTodos: todos,
        }),
      );
      dispatch(
        deleteMilestoneLocally({
          milestoneId: milestone?.id,
          todoId: todo?.id,
        }),
      );
    },
    onTap: () => {
      setBgColor(`${dark ? '#427676' : '#56a691'}`);
    },
    onSwiped: () => {
      setBgColor(`${dark ? '#427676' : '#56a691'}`);
    },
    onTouchStartOrOnMouseDown: () => {
      setBgColor('#FB003D');
    },
  });
  return (
    <div>
      <div {...handlers}>
        <Swiper
          spaceBetween={0}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          slidesPerView={1}
          threshold={0}
          edgeSwipeThreshold={0}
          initialSlide={2}
          allowSlidePrev={false}
          style={{ backgroundColor: bgColor }}
        >
          <SwiperSlide>
            <div className="flex items-center  bg-secondaryLight h-[5.5rem]"></div>
          </SwiperSlide>
          <SwiperSlide>{children}</SwiperSlide>
          <style>{`.swiper-slide-active{background-color:${
            dark ? '#427676' : '#56a691'
          }
         

          `}</style>
          <style>
            {`.swiper{border-color:${dark ? '#427676' : '#56a691'}`}
          </style>
        </Swiper>
      </div>
    </div>
  );
};

export default Swipeable;
