import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { db } from "../../../container/firebase";
import { getDoc, doc } from "firebase/firestore";
import { SingeTodoInterface } from "../../../interfaces/interfaces";

export const getTodo = createAsyncThunk(
  "getTodos",
  async ({ userUid }: { userUid: string }) => {
    try {
      const docRef = doc(db, "userData", userUid);
      const docData = getDoc(docRef).then((doc) => ({
        ...doc.data(),
      }));
      return docData;
    } catch (err) {}
  },
);

const getTodosSlice = createSlice({
  name: "getTodos",
  initialState: {
    todos: [],
    error: [],
    status: "",
  },
  reducers: {
    setTodos: (state: any, action: PayloadAction<SingeTodoInterface>) => {
      state.todos?.unshift(action.payload);
    },
    deleteTodo: (
      state: any,
      action: PayloadAction<{
        todoId: string;
      }>,
    ) => {
      state.todos = state.todos?.filter(
        (todo: SingeTodoInterface) => todo.id !== action.payload.todoId,
      );
    },
    updateTodo: (
      state: {
        todos: SingeTodoInterface[];
        error: {}[];
        status: string;
      },
      action: PayloadAction<{ todoId: string }>,
    ) => {
      state.todos = state.todos?.map((todo: SingeTodoInterface) => {
        if (todo.id === action.payload.todoId) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },
    reArrangeTodos: (
      state: {
        todos: SingeTodoInterface[];
        error: {}[];
        status: string;
      },
      action: PayloadAction<SingeTodoInterface[]>,
    ) => {
      state.todos = action.payload;
    },
  },
  extraReducers(build) {
    build.addCase(getTodo.pending, (state) => {
      state.status = "pending";
    }),
      build.addCase(getTodo.fulfilled, (state, action: any) => {
        state.status = "fulfilled";
        state.todos = action.payload?.todos;
      }),
      build.addCase(getTodo.rejected, (state, action: any) => {
        state.error = action.error.message;
        state.status = "rejected";
      });
  },
});

export default getTodosSlice.reducer;
export const { setTodos, deleteTodo, updateTodo, reArrangeTodos } =
  getTodosSlice.actions;
