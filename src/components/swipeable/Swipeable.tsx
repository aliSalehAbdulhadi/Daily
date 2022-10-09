import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useRouter } from 'next/router';
import 'swiper/css';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../interfaces/interfaces';
import { toggleDisableDragDnd } from '../../redux/slices/features/disableDragDndSlice';

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
  const router = useRouter();
  const { id } = router.query;

  const [bgColor, setBgColor] = useState(dark ? '#427676' : '#56a691');
  const dispatch = useAppDispatch();
  const handlers = useSwipeable({
    delta: { left: 280 },
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

  const disableSwiper = useAppSelector(
    (state: RootState) => state.disableSwiperReducer.disableSwiper,
  );


  return (
    <div className="z-50" {...handlers}>
      <Swiper
        spaceBetween={0}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        slidesPerView={1}
        threshold={0}
        edgeSwipeThreshold={0}
        initialSlide={1}
        allowSlidePrev={false}
        allowSlideNext={disableSwiper}
        style={{ backgroundColor: bgColor }}
        observer
      >
        <SwiperSlide>
          <div>placeholder div to fill the fist slide</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="rounded">{children}</div>
        </SwiperSlide>
        <style>{`.swiper-slide-active{background-color:${
          !id ? ' ' : dark ? '#427676' : '#56a691'
        }
          `}</style>
        <style>{`.swiper{border-color:${dark ? '#427676' : '#56a691'}`}</style>
      </Swiper>
    </div>
  );
};

export default Swipeable;
