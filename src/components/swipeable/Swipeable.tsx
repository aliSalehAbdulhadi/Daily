import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import 'swiper/css';
import { useAppDispatch } from '../../interfaces/interfaces';
import { toggleDisableDragDnd } from '../../redux/slices/features/disableDragDndSlice';
import { AiFillDelete } from 'react-icons/ai';
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

  const dispatch = useAppDispatch();
  const handlers = useSwipeable({
    delta: { left: 130 },
    onSwipedLeft: () => {
      dispatch(toggleDisableDragDnd(true));
      isLocked ? setIsLockedAnimation(true) : setIsDeleting(true);
    },
    onSwipedRight: () => {
      setIsDeleting(false);
    },

    onTouchStartOrOnMouseDown: () => {
      dispatch(toggleDisableDragDnd(false));
    },
  });
  useEffect(() => {
    isDeletingOpen(isDeleting);
  }, [isDeleting, isDeletingOpen]);

  useEffect(() => {
    setTimeout(() => {
      setIsLockedAnimation(false);
    }, 200);
  });

  const deleteRef = useClickOutside(() => {
    setIsDeleting(false);
  });

  return (
    <div className="flex overflow-hidden" {...handlers}>
      <div
        className={`transition-all ${isDeleting ? 'w-[80%]' : 'w-full'} ${
          isLockedAnimation ? ' shakeAnimation' : ''
        }`}
      >
        {children}
      </div>
      <div
        ref={deleteRef}
        onClick={() => {
          setIsDeleting(false);
          setTimeout(() => {
            handler();
          }, 100);
        }}
        className={`bg-red-500 opacity-90 transition-all flex items-center justify-center w-[20%]  h-fill ${
          isMilestone ? '' : 'rounded-r'
        } ${isDeleting ? 'block' : 'hidden'}`}
      >
        <AiFillDelete size={35} fill="white" />
      </div>
    </div>
  );
};

export default Swipeable;
