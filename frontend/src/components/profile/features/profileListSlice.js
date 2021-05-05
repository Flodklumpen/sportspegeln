import { createSlice } from '@reduxjs/toolkit';
import ArrowDown from './caret-down.svg';
import ArrowUp from './caret-up.svg';

const initialState = {
  futureMatch: {
    class: "d-none d-sm-block",
    arrow: ArrowDown
  },
  pastMatch: {
    class: "d-none d-sm-block",
    arrow: ArrowDown
  },
  ownedTournament: {
    class: "d-none d-sm-block",
    arrow: ArrowDown
  },
  competingTournament: {
    class: "d-none d-sm-block",
    arrow: ArrowDown
  }
};

const reducerHelp = (state) => {
  if (state.class === "d-none d-sm-block") {
    state.class = "d-block d-sm-block";
    state.arrow = ArrowUp;
  } else {
    state.class = "d-none d-sm-block";
    state.arrow = ArrowDown;
  }
};

export const profileListSlice = createSlice({
  name: "profileList",
  initialState,
  reducers: {
    futureMatchReducer: (state) => { reducerHelp(state.futureMatch) },
    pastMatchReducer: (state) => { reducerHelp(state.pastMatch) },
    ownedTournamentReducer: (state) => { reducerHelp(state.ownedTournament) },
    competingTournamentReducer: (state) => { reducerHelp(state.competingTournament) },
  },
});

export const {
  futureMatchReducer,
  pastMatchReducer,
  ownedTournamentReducer,
  competingTournamentReducer
} = profileListSlice.actions;


export const selectFutureMatch = (state) => state.profileList.futureMatch;
export const selectPastMatch = (state) => state.profileList.pastMatch;
export const selectOwnedTournament = (state) => state.profileList.ownedTournament;
export const selectCompetingTournament = (state) => state.profileList.competingTournament;

export default profileListSlice.reducer;
