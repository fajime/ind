import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { authReducer } from './reducers/authReducer';

export const store = configureStore({
  middleware: [thunk],
  reducer: {
    auth: authReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
