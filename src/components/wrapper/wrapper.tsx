import { batch } from 'react-redux';
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
import {
  DndContext,
  closestCenter,
  useSensor,
  MouseSensor,
  useSensors,
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

const Wrapper = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();

  const tasks: SingleTaskInterface[] = Tasks();
  const user = UserKey();
  const [tasksItems, setTasksItems] = useState(tasks);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  useEffect(() => {
    batch(() => {
      dispatch(reArrangeTasksLocally(tasksItems));
      if (isOnline()) {
        dispatch(reArrangeFirebase({ userUid: user, allTasks: tasksItems }));
      }
    });
  }, [dispatch, tasksItems, user]);
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const items = Array.from(tasks);
      const activeIndex = items
        .map((item: SingleTaskInterface) => item.id)
        .indexOf(active.id);
      const overIndex = items
        .map((item: SingleTaskInterface) => item.id)
        .indexOf(over.id);
      setTasksItems(arrayMove(items, activeIndex, overIndex));
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
