import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { AiFillDelete } from 'react-icons/ai';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../interfaces/interfaces';
import { toggleDisableDragDnd } from '../../redux/slices/features/disableDragDndSlice';
import useClickOutside from '../../hooks/useClickOutside';

const Swipeable = ({
  children,
  handler,
  isDeletingOpen,
  isMilestone,
  isLocked,
}: {
  children: JSX.Element;
  handler: Function;
  isDeletingOpen: Function;
  isMilestone?: boolean;
  isLocked?: boolean;
}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLockedAnimation, setIsLockedAnimation] = useState<boolean>(false);
  const disableSwiper = useAppSelector(
    (state: RootState) => state.disableSwiperReducer.disableSwiper,
  );
  const dispatch = useAppDispatch();
  const handlers = useSwipeable({
    delta: { left: 120 },
    onSwipedLeft: () => {
      dispatch(toggleDisableDragDnd(true));
      isLocked ? setIsLockedAnimation(true) : setIsDeleting(true);
      disableSwiper || isLocked ? setIsDeleting(false) : setIsDeleting(true);
    },
    onSwipedRight: () => {
      setIsDeleting(false);
      dispatch(toggleDisableDragDnd(false));
    },

    onTouchStartOrOnMouseDown: () => {},
  });
  useEffect(() => {
    isDeletingOpen(isDeleting);
  }, [isDeleting, isDeletingOpen]);

  useEffect(() => {
    setTimeout(() => {
      setIsLockedAnimation(false);
    }, 220);
  });

  const deleteRef = useClickOutside(() => {
    setIsDeleting(false);
  });

  return (
    <div
      className={`flex ${isDeleting ? ' overflow-hidden ' : ''}`}
      {...handlers}
    >
      <div
        className={`transition-all  flex items-center w-full relative  ${
          isDeleting ? 'translate-x-[-5rem]' : ''
        } ${isLockedAnimation ? ' shakeAnimation' : ''}`}
      >
        <div className="w-full shrink-0">{children}</div>
        <div
          ref={deleteRef}
          onClick={() => {
            setIsDeleting(false);
            setTimeout(() => {
              handler();
            }, 140);
          }}
          className={`bg-red-500 opacity-90 transition-all flex items-center justify-center absolute right-[-4.95rem] w-[5rem] h-full  ${
            isMilestone ? '' : 'rounded-r'
          } ${isDeleting ? 'block' : 'hidden'}`}
        >
          <AiFillDelete size={32} fill="white" />
        </div>
      </div>
    </div>
  );
};

export default Swipeable;
