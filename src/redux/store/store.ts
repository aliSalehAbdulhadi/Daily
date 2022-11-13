import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import signUpSlice from '../slices/authentication/signUpSlice';
import signInSlice from '../slices/authentication/signInSlice';
import userSlice from '../slices/authentication/userSlice';
import addTaskSlice from '../slices/features/addTaskSlice';
import getTaskSlice from '../slices/features/getTasksSlice';
import darkMode from '../slices/features/darkModeSlice';
import resetPasswordSlice from '../slices/authentication/resetPasswordSlice';
import disableSwiper from '../slices/features/disableSwiperSlice';
import disableDragDnd from '../slices/features/disableDragDndSlice';
import sortTasksSlice from '../slices/features/sortTasksSlice';
import sortMilestonesSlice from '../slices/features/sortMilestonesSlice';
import milestonePunctCheckboxSlice from '../slices/features/milestonePunctCheckboxSlice';
import storedTasks from '../slices/features/dbTasks';
import uploadLocalData from '../slices/features/uploadLocalData';
import removeTaskStatus from '../slices/features/deleteTaskSlice';

const rootReducer = combineReducers({
  signUpReducer: signUpSlice,
  signInReducer: signInSlice,
  userReducer: userSlice,
  addTaskReducer: addTaskSlice,
  getTaskReducer: getTaskSlice,
  darkModeReducer: darkMode,
  resetPasswordReducer: resetPasswordSlice,
  disableSwiperReducer: disableSwiper,
  disableDragReducer: disableDragDnd,
  sortTaskReducer: sortTasksSlice,
  sortMilestonesReducer: sortMilestonesSlice,
  uploadLocalDataReducer: uploadLocalData,
  sortTasksReducer: sortTasksSlice,
  milestonePunctCheckboxReducer: milestonePunctCheckboxSlice,
  dbTasksReducer: storedTasks,
  removeTaskStatusReducer: removeTaskStatus,
});

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['dbTasksReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
