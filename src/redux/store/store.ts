import { configureStore } from "@reduxjs/toolkit";
import addTaskSlice from "../features/addTaskSlice";

const store = configureStore({
  reducer: {
    addTaskReducer: addTaskSlice,
  },
});

export default store;
