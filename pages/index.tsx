import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../src/components/Navbar/Navbar";
import TaskForm from "../src/components/TaskForm/TaskForm";
import TasksContainer from "../src/components/TasksContainer/TasksContainer";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { completedTodo } from "../src/redux/slices/features/completeTodo";
import {
  reArrangeTodos,
  updateTodo,
} from "../src/redux/slices/features/getTodoSlice";
import { reArrangeFirebase } from "../src/redux/slices/features/reArrangeTodos";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
  SingleTodoInterface,
} from "../src/interfaces/interfaces";

const Home: NextPage = () => {
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
    <DragDropContext onDragEnd={onDragEndHandler}>
      <Head>
        <title className="bg-red-500">Daily</title>
        <meta name="Todo App" content="Add your daily tasks" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/images/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#d58989" />
      </Head>
      <Navbar />
      <TaskForm />
      <TasksContainer />
    </DragDropContext>
  );
};

export default Home;
