import { combineReducers } from 'redux'

import counterReducer from '../features/counter/counterSlice';
import tabSelectReducer from '../components/menu/features/tabSelectSlice';
import showHideListReducer from '../components/profile/features/profileListSlice';
import registerUserReducer from "../components/login/features/registerUser/registerUserSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  tabSelect: tabSelectReducer,
  profileList: showHideListReducer,
  userData: registerUserReducer
});

export default rootReducer
