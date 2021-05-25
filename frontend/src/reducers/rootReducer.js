import { combineReducers } from 'redux'

import tabSelectReducer from './tabSelect';
import showHideListReducer from './profileList';
import storeUserTokenReducer from "./storeToken";
import tournamentReducer from "./tournament";
import storeDefenderReducer from "./storeDefender";
import storeCanChallenge from "./storeCanChallenge";
import registerUserReducer from "./registerUser";
import getUserDataReducer from "./getUserData";
import getRankReducer from "./getRank";
import getTournamentsReducer from "./getTournaments";
import getCompetingTournamentsReducer from "./getCompetingTournaments";
import getOwnedTournamentsReducer from "./getOwnedTournaments";
import joinTournamentReducer from "./joinTournament";
import changeMatchReducer from './changeMatch';
import matchReducer from './match';
import createTournamentReducer from "./createTournament";

const rootReducer = combineReducers({
  tabSelect: tabSelectReducer,
  profileList: showHideListReducer,
  userToken: storeUserTokenReducer,
  tournament: tournamentReducer,
  currentDefender: storeDefenderReducer,
  canChallenge: storeCanChallenge,
  createTournament: createTournamentReducer,
  registerUser: registerUserReducer,
  userData: getUserDataReducer,
  rank: getRankReducer,
  tournaments: getTournamentsReducer,
  competingTournaments: getCompetingTournamentsReducer,
  ownedTournaments: getOwnedTournamentsReducer,
  joinTournament: joinTournamentReducer,
  changeMatch: changeMatchReducer,
  match: matchReducer,
});

export default rootReducer
