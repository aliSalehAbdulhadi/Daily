import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import signUpSlice from '../slices/authentication/signUpSlice';
import signInSlice from '../slices/authentication/signInSlice';
import userSlice from '../slices/authentication/userSlice';
import addTaskSlice from '../slices/features/fireBaseActions/addTaskSlice';
import getTaskSlice from '../slices/features/getTasksSlice';
import darkMode from '../slices/features/darkModeSlice';
import resetPasswordSlice from '../slices/authentication/resetPasswordSlice';
import disableSwiper from '../slices/features/disableSwiperSlice';
import disableDragDnd from '../slices/features/disableDragDndSlice';
import sortTasksSlice from '../slices/features/sortTasksSlice';
import sortMilestonesSlice from '../slices/features/sortMilestonesSlice';
import milestonePunctCheckboxSlice from '../slices/features/milestonePunctCheckboxSlice';
import trickStore from '../slices/features/trickStore';
import uploadLocalData from '../slices/features/fireBaseActions/uploadLocalData';
import removeTaskStatus from '../slices/features/fireBaseActions/deleteTaskSlice';
import openMoveMilestoneSlice from '../slices/features/openMoveMilestoneSlice';
import selectedMilestone from '../slices/features/selectedMilestone';

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
  removeTaskStatusReducer: removeTaskStatus,
  trickStoreReducer: trickStore,
  openMoveMilestoneReducer: openMoveMilestoneSlice,
  selectedMilestoneReducer: selectedMilestone,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'trickStoreReducer',
    'uploadLocalDataReducer',
    'openMoveMilestoneReducer',
    'disableSwiperReducer',
    'disableDragReducer',
    'selectedMilestoneReducer',
  ],
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
