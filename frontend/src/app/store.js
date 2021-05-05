import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tabSelectReducer from '../components/menu/features/tabSelectSlice';
import showHideListReducer from '../components/profile/features/profileListSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tabSelect: tabSelectReducer,
    profileList: showHideListReducer,
  },
});
