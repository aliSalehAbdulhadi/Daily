import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../src/components/Navbar/Navbar";
import TaskForm from "../src/components/TaskForm/TaskForm";
import TasksContainer from "../src/components/TasksContainer/TasksContainer";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { completedTodo } from "../src/redux/slices/features/completeTodo";
import { getTodo, updateTodo } from "../src/redux/slices/features/getTodoSlice";

import {
  useAppDispatch,
  useAppSelector,
  RootState,
} from "../src/interfaces/interfaces";

const Home: NextPage = () => {
  const todos: { id: string; content: string; completed: boolean }[] =
    useAppSelector((state: RootState) => state.getTodoReducer.todos);
  const user = useAppSelector((state: RootState) => state.userReducer.userUid);
  const dispatch = useAppDispatch();

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;

    if (destination.droppableId === "CompletedTodos" || "NewTodos") {
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Head>
        <title className="bg-red-500">Daily</title>
        <meta name="Todo App" content="Add your daily tasks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <TaskForm />
      <TasksContainer />
    </DragDropContext>
  );
};

export default Home;
