import { combineReducers } from 'redux'

import tabSelectReducer from './tabSelect';
import showHideListReducer from './profileList';
import storeUserTokenReducer from "./storeToken";
import tournamentReducer from "./tournament";
import registerUserReducer from "./registerUser";
import getUserDataReducer from "./getUserData";
import getRankReducer from "./getRank";
import getTournamentsReducer from "./getTournaments";
import createMatchReducer from "./createMatch";
import joinTournamentReducer from "./joinTournament";
import getFutureMatchesReducer from './getFutureMatches';
import editMatchReducer from './editMatch';


const rootReducer = combineReducers({
  tabSelect: tabSelectReducer,
  profileList: showHideListReducer,
  userToken: storeUserTokenReducer,
  tournament: tournamentReducer,
  registerUser: registerUserReducer,
  userData: getUserDataReducer,
  rank: getRankReducer,
  tournaments: getTournamentsReducer,
  createMatch: createMatchReducer,
  joinTournament: joinTournamentReducer,
  futureMatches: getFutureMatchesReducer,
  editMatch: editMatchReducer
});

export default rootReducer
