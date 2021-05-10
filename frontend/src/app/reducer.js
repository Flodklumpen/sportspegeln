import { combineReducers } from 'redux'

import counterReducer from '../features/counter/counterSlice';
import tabSelectReducer from '../components/menu/features/tabSelectSlice';
import showHideListReducer from '../components/profile/features/profileListSlice';
import registerUserReducer from "../components/menu/features/registerUser/registerUserSlice";
import getUserDataReducer from "../components/profile/features/userData/getUserDataSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  tabSelect: tabSelectReducer,
  profileList: showHideListReducer,
  registerUser: registerUserReducer,
  userData: getUserDataReducer
});

export default rootReducer
