import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  futureMatchClass: "d-none d-md-block",
  pastMatchClass: "d-none d-md-block",
  ownedTournamentsClass: "d-none d-md-block",
  competingTournamentClass: "d-none d-md-block"
}

export const profileListSlice = createSlice({
  name: "profileList",
  initialState,
  reducers: {
    futureMatchList: (state) => {
      if (state.futureMatchClass === "d-none d-md-block") {
        state.futureMatchClass = "d-block d-md-block";
      } else {
        state.futureMatchClass = "d-none d-md-block";
      }
    },
    pastMatchList: (state) => {
      if (state.pastMatchClass === "d-none d-md-block") {
        state.pastMatchClass = "d-block d-md-block";
      } else {
        state.pastMatchClass = "d-none d-md-block";
      }
    },
    ownedTournamentsList: (state) => {
      if (state.ownedTournamentsClass === "d-none d-md-block") {
        state.ownedTournamentsClass = "d-block d-md-block";
      } else {
        state.ownedTournamentsClass = "d-none d-md-block";
      }
    },
    competingTournamentList: (state) => {
      if (state.competingTournamentClass === "d-none d-md-block") {
        state.competingTournamentClass = "d-block d-md-block";
      } else {
        state.competingTournamentClass = "d-none d-md-block";
      }
    },
  },
});

export const { futureMatchList, pastMatchList, ownedTournamentsList, competingTournamentList } = profileListSlice.actions;

export const selectFutureMatch = (state) => state.profileList.futureMatchClass;
export const selectPastMatch = (state) => state.profileList.pastMatchClass;
export const selectOwnedTournament = (state) => state.profileList.ownedTournamentsClass;
export const selectCompetingTournament = (state) => state.profileList.competingTournamentClass;

export default profileListSlice.reducer;
