import { combineReducers } from 'redux'

import tabSelectReducer from './tabSelect';
import showHideListReducer from './profileList';
import storeUserTokenReducer from "./storeToken";
import tournamentReducer from "./tournament";
import registerUserReducer from "./registerUser";
import getUserDataReducer from "./getUserData";
import getRankReducer from "./getRank";
import getTournamentsReducer from "./getTournaments";
import joinTournamentReducer from "./joinTournament";
import changeMatchReducer from './changeMatch';
import matchReducer from './match';
import getFutureMatchesReducer from './getFutureMatches';
import editMatchReducer from './editMatch';
import getPastMatchesReducer from './getPastMatches';
import reportMatchReducer from './reportMatch';
import createTournamentReducer from "./createTournament";

const rootReducer = combineReducers({
  tabSelect: tabSelectReducer,
  profileList: showHideListReducer,
  userToken: storeUserTokenReducer,
  tournament: tournamentReducer,
  createTournament: createTournamentReducer,
  registerUser: registerUserReducer,
  userData: getUserDataReducer,
  rank: getRankReducer,
  tournaments: getTournamentsReducer,
  joinTournament: joinTournamentReducer,
  changeMatch: changeMatchReducer,
  match: matchReducer
  futureMatches: getFutureMatchesReducer,
  editMatch: editMatchReducer,
  pastMatches: getPastMatchesReducer,
  reportMatch:reportMatchReducer,
});

export default rootReducer
