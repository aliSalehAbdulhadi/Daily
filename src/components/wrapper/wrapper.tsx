import { batch } from 'react-redux';
import {
  DndContext,
  closestCenter,
  useSensor,
  MouseSensor,
  useSensors,
  TouchSensor,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { reArrangeTasksLocally } from '../../redux/slices/features/getTasksSlice';
import { reArrangeFirebase } from '../../redux/slices/features/fireBaseActions/reArrangeTasksSlice';
import {
  useAppDispatch,
  SingleTaskInterface,
} from '../../interfaces/interfaces';
import Navbar from '../Navbar/Navbar';
import { toggleDisableSwiper } from '../../redux/slices/features/disableSwiperSlice';
import { sortTaskBy } from '../../redux/slices/features/sortTasksSlice';
import { isOnline } from '../../utilities/isOnline';
import { Tasks, UserKey } from '../../utilities/globalImports';

const Wrapper = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();
  const tasks: SingleTaskInterface[] = Tasks();
  const user = UserKey();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const items = Array.from(tasks);
      const activeIndex = items
        .map((item: SingleTaskInterface) => item?.id)
        .indexOf(active?.id);
      const overIndex = items
        .map((item: SingleTaskInterface) => item?.id)
        .indexOf(over?.id);

      batch(() => {
        dispatch(
          reArrangeTasksLocally(arrayMove(items, activeIndex, overIndex)),
        );
        // if (isOnline()) {
        //   dispatch(reArrangeFirebase({ userUid: user, allTasks: items }));
        // }
      });
    }
  };

  return (
    <DndContext
      onDragStart={() => {
        dispatch(toggleDisableSwiper(false));
        dispatch(sortTaskBy(''));
      }}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <Navbar />

      {children}
    </DndContext>
  );
};

export default Wrapper;
