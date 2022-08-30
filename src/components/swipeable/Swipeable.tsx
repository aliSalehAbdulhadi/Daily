import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../interfaces/interfaces';
import { toggleDisableDragDnd } from '../../redux/slices/features/disableDragDnd';

const Swipeable = ({
  children,
  handler,
}: {
  children: JSX.Element;
  handler: Function;
}) => {
  const dark = useAppSelector(
    (state: RootState) => state.darkModeReducer.darkMode,
  );

  const [bgColor, setBgColor] = useState(dark ? '#427676' : '#56a691');
  const dispatch = useAppDispatch();
  const handlers = useSwipeable({
    delta: { left: 310 },
    swipeDuration: 3000,
    onSwipedLeft: () => {
      dispatch(toggleDisableDragDnd(true));
      handler();
    },
    onTap: () => {
      setBgColor(`${dark ? '#427676' : '#56a691'}`);
    },
    onSwiped: () => {
      setBgColor(`${dark ? '#427676' : '#56a691'}`);
    },
    onTouchStartOrOnMouseDown: () => {
      dispatch(toggleDisableDragDnd(false));

      setBgColor('#C41E3A');
    },
  });

  return (
    <div className="bg-red-100 z-50" {...handlers}>
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
          <div>placeholder div to fill the fist slide</div>
        </SwiperSlide>
        <SwiperSlide>
          <div>{children}</div>
        </SwiperSlide>
        <style>{`.swiper-slide-active{background-color:${
          dark ? '#427676' : '#56a691'
        }
          `}</style>
        <style>{`.swiper{border-color:${dark ? '#427676' : '#56a691'}`}</style>
      </Swiper>
    </div>
  );
};

export default Swipeable;
