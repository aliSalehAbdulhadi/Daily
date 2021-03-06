import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "../slices/authentication/signUpSlice";
import signInSlice from "../slices/authentication/signInSlice";
import userSlice from "../slices/authentication/userSlice";
import addTodoSlice from "../slices/features/addTodoSlice";
import getTodoSlice from "../slices/features/getTodoSlice";
import darkMode from "../slices/features/darkMode";
import resetPasswordSlice from "../slices/authentication/resetPasswordSlice";

const store = configureStore({
  reducer: {
    signUpReducer: signUpSlice,
    signInReducer: signInSlice,
    userReducer: userSlice,
    addTodoReducer: addTodoSlice,
    getTodoReducer: getTodoSlice,
    darkModeReducer: darkMode,
    resetPasswordReducer: resetPasswordSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
