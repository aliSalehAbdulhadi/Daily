import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import signUpSlice from '../slices/authentication/signUpSlice';
import signInSlice from '../slices/authentication/signInSlice';
import userSlice from '../slices/authentication/userSlice';
import addTodoSlice from '../slices/features/addTodoSlice';
import getTodoSlice from '../slices/features/getTodoSlice';
import darkMode from '../slices/features/darkMode';
import resetPasswordSlice from '../slices/authentication/resetPasswordSlice';

const rootReducer = combineReducers({
  signUpReducer: signUpSlice,
  signInReducer: signInSlice,
  userReducer: userSlice,
  addTodoReducer: addTodoSlice,
  getTodoReducer: getTodoSlice,
  darkModeReducer: darkMode,
  resetPasswordReducer: resetPasswordSlice,
});

const persistConfig = {
  key: 'root',
  storage,
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
