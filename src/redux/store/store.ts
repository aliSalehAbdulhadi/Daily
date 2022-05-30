import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "../slices/authentication/signUpSlice";
import signInSlice from "../slices/authentication/signInSlice";
import userSlice from "../slices/authentication/userSlice";
import addTodoSlice from "../slices/features/addTodoSlice";
import getTodoSlice from "../slices/features/getTodoSlice";

const store = configureStore({
  reducer: {
    signUpReducer: signUpSlice,
    signInReducer: signInSlice,
    userReducer: userSlice,
    addTodoReducer: addTodoSlice,
    getTodoReducer: getTodoSlice,
  },
});

export default store;
