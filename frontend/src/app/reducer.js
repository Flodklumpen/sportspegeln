import { combineReducers } from 'redux'

import counterReducer from '../features/counter/counterSlice';
import tabSelectReducer from '../components/menu/features/tabSelectSlice';
import showHideListReducer from '../components/profile/features/profileListSlice';
import storeUserTokenReducer from "../components/menu/features/registerUser/storeTokenSlice";
import tournamentReducer from "../components/tournament/tournamentSlice";
import registerUserReducer from "../components/menu/features/registerUser/registerUserSlice";
import getUserDataReducer from "../components/profile/features/userData/getUserDataSlice";
import getRankReducer from "../components/tournament/getRankSlice";
import getTournamentsReducer from "../components/tournament/getTournamentsSlice";


const rootReducer = combineReducers({
  counter: counterReducer,
  tabSelect: tabSelectReducer,
  profileList: showHideListReducer,
  userToken: storeUserTokenReducer,
  tournament: tournamentReducer,
  registerUser: registerUserReducer,
  userData: getUserDataReducer,
  rank: getRankReducer,
  tournaments: getTournamentsReducer
});

export default rootReducer
