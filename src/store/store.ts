import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import emailReducer from './email.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
