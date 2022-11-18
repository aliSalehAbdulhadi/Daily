import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { completedTask } from '../../redux/slices/features/fireBaseActions/completeTaskSlice';
import {
  reArrangeTasksLocally,
  completeTaskLocally,
} from '../../redux/slices/features/getTasksSlice';
import { reArrangeFirebase } from '../../redux/slices/features/fireBaseActions/reArrangeTasksSlice';
import {
  useAppDispatch,
  useAppSelector,
  RootState,
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

  const onDragEndHandler = (result: DropResult) => {
    dispatch(toggleDisableSwiper(true));
    const { destination, source } = result;
    if (!destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    dispatch(reArrangeTasksLocally(items));
    if (isOnline()) {
      dispatch(reArrangeFirebase({ userUid: user, allTasks: items }));
    }

    // drag and drop to complete tasks "currently disabled"
    if (destination.droppableId === 'CompletedTasks' || 'NewTasks') {
      if (source.droppableId === destination.droppableId) {
        return false;
      } else {
        if (isOnline()) {
          dispatch(
            completedTask({
              userUid: user,
              taskId: result.draggableId,
              allTasks: tasks,
            }),
          );
        }
        dispatch(completeTaskLocally({ taskId: result.draggableId }));
      }
    }
  };

  return (
    <DragDropContext
      onDragEnd={onDragEndHandler}
      onDragStart={() => {
        dispatch(toggleDisableSwiper(false));
        dispatch(sortTaskBy(''));
      }}
    >
      <Navbar />
      {children}
    </DragDropContext>
  );
};

export default Wrapper;
