import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import questionsReducer from './questions/questionsSlice';

export const store = configureStore({
  reducer: {
    questionsState: questionsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
