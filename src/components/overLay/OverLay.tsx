import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import React, { ReactChild } from 'react';
import { completedTodo } from '../../redux/slices/features/completeTodo';
import {
  reArrangeTodos,
  updateTodo,
} from '../../redux/slices/features/getTodoSlice';
import { reArrangeFirebase } from '../../redux/slices/features/reArrangeTodos';
import {
  useAppDispatch,
  useAppSelector,
  RootState,
  SingleTodoInterface,
} from '../../interfaces/interfaces';
import Navbar from '../Navbar/Navbar';
const OverLay = ({ children }: { children: ReactChild }) => {
  const dispatch = useAppDispatch();

  const todos: SingleTodoInterface[] = useAppSelector(
    (state: RootState) => state.getTodoReducer.todos,
  );
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const onDragEndHandler = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    dispatch(reArrangeTodos(items));
    dispatch(reArrangeFirebase({ userUid: user, allTodos: items }));

    if (destination.droppableId === 'CompletedTodos' || 'NewTodos') {
      if (source.droppableId === destination.droppableId) {
        return false;
      } else {
        dispatch(
          completedTodo({
            userUid: user,
            todoId: result.draggableId,
            allTodos: todos,
          }),
        );
        dispatch(updateTodo({ todoId: result.draggableId }));
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <Navbar />
      {children}
    </DragDropContext>
  );
};

export default OverLay;
