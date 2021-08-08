import { combineReducers } from 'redux'

import tabSelectReducer from './tabSelect';
import toggleProfileListReducer from './profileList';
import storeUserTokenReducer from "./storeToken";
import tournamentReducer from "./tournament";
import storeDefenderReducer from "./storeDefender";
import storeCanChallenge from "./storeCanChallenge";
import registerUserReducer from "./registerUser";
import getUserDataReducer from "./getUserData";
import getRankReducer from "./getRank";
import getTournamentsReducer from "./getTournaments";
import getNrOfChallengesReducer from "./getNrOfChallenges";
import joinTournamentReducer from "./joinTournament";
import changeMatchReducer from './changeMatch';
import matchReducer from './match';
import createTournamentReducer from "./createTournament";
import editTournamentReducer from "./editTournament";

const rootReducer = combineReducers({
  tabSelect: tabSelectReducer,
  toggleProfileList: toggleProfileListReducer,
  userToken: storeUserTokenReducer,
  tournament: tournamentReducer,
  currentDefender: storeDefenderReducer,
  canChallenge: storeCanChallenge,
  createTournament: createTournamentReducer,
  registerUser: registerUserReducer,
  userData: getUserDataReducer,
  rank: getRankReducer,
  tournaments: getTournamentsReducer,
  nrOfChallenges: getNrOfChallengesReducer,
  joinTournament: joinTournamentReducer,
  changeMatch: changeMatchReducer,
  match: matchReducer,
  editTournament: editTournamentReducer,
});

export default rootReducer
