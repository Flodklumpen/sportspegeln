import { createSlice } from '@reduxjs/toolkit';
import ArrowDown from '../images/caret-down.svg';
import ArrowUp from '../images/caret-up.svg';

const initialState = {
  futureMatchState: {
    class: "d-none d-sm-block",
    arrow: ArrowDown
  },
  pastMatchState: {
    class: "d-none d-sm-block",
    arrow: ArrowDown
  },
  ownedTournamentState: {
    class: "d-none d-sm-block",
    arrow: ArrowDown
  },
  competingTournamentState: {
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
    toggleFutureMatchState: (state) => { reducerHelp(state.futureMatchState) },
    togglePastMatchState: (state) => { reducerHelp(state.pastMatchState) },
    toggleOwnedTournamentState: (state) => { reducerHelp(state.ownedTournamentState) },
    toggleCompetingTournamentState: (state) => { reducerHelp(state.competingTournamentState) },
  },
});

export const {
  toggleFutureMatchState,
  togglePastMatchState,
  toggleOwnedTournamentState,
  toggleCompetingTournamentState
} = profileListSlice.actions;


export const selectFutureMatchState = (state) => state.toggleProfileList.futureMatchState;
export const selectPastMatchState = (state) => state.toggleProfileList.pastMatchState;
export const selectOwnedTournamentsState = (state) => state.toggleProfileList.ownedTournamentState;
export const selectCompetingTournamentsState = (state) => state.toggleProfileList.competingTournamentState;

export default profileListSlice.reducer;
