import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tabSelectReducer from '../components/menu/features/tabSelectSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tabSelect: tabSelectReducer,
  },
});
