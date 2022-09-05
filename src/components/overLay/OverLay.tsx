import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { completedTask } from '../../redux/slices/features/completeTaskSlice';
import {
  reArrangeTasks,
  completeTaskLocally,
} from '../../redux/slices/features/getTasksSlice';
import { reArrangeFirebase } from '../../redux/slices/features/reArrangeTasksSlice';
import {
  useAppDispatch,
  useAppSelector,
  RootState,
  SingleTaskInterface,
} from '../../interfaces/interfaces';
import Navbar from '../Navbar/Navbar';
import { toggleDisableSwiper } from '../../redux/slices/features/disableSwiperSlice';
import { sortTaskBy } from '../../redux/slices/features/sortTasksSlice';

const OverLay = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();

  const tasks: SingleTaskInterface[] = useAppSelector(
    (state: RootState) => state.getTaskReducer.tasks,
  );
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);

  const onDragEndHandler = (result: DropResult) => {
    dispatch(toggleDisableSwiper(true));
    const { destination, source } = result;
    if (!destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    dispatch(reArrangeTasks(items));
    dispatch(reArrangeFirebase({ userUid: user, allTasks: items }));

    if (destination.droppableId === 'CompletedTasks' || 'NewTasks') {
      if (source.droppableId === destination.droppableId) {
        return false;
      } else {
        dispatch(
          completedTask({
            userUid: user,
            taskId: result.draggableId,
            allTasks: tasks,
          }),
        );
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

export default OverLay;
