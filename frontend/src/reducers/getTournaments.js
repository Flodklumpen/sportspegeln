import { client } from "../client";

const initialState = {
  allTournaments: [],
  ownedTournaments: [],
  competingTournaments: []
};

export default function getTournamentsReducer(state = initialState, action) {
  switch (action.type) {
    case 'data/allTournaments': {
      return {
        ...state,
        allTournaments: action.payload
      }
    }
    case 'data/ownedTournaments': {
      return {
        ...state,
        ownedTournaments: action.payload
      }
    }
    case 'data/competingTournaments': {
      return {
        ...state,
        competingTournaments: action.payload
      }
    }
    default:
      return state
  }
}

export function fetchAllTournaments() {
  return async function fetchAllTournamentsThunk(dispatch) {
    const response = await client.get('/tournament/get_all_tournaments', "", "");
    if (response) {
      dispatch({type: 'data/allTournaments', payload: response.data});
    }
  }
}

export function fetchOwnedTournaments(email, token) {
  return async function fetchOwnedTournamentsThunk(dispatch) {
    const response = await client.get('/tournament/get_owned_tournaments?email=' + email, email, token);
    if (response) {
      dispatch({type: 'data/ownedTournaments', payload: response.data});
    }
  }
}

export function fetchCompetingTournaments(email, token) {
  return async function fetchCompetingTournamentsThunk(dispatch) {
    const response = await client.get('/tournament/get_competing_tournaments?email=' + email, email, token);
    if (response) {
      dispatch({type: 'data/competingTournamentsLoaded', payload: response.data});
    }
  }
}

export const selectTournaments = (state) => state.tournaments.allTournaments;
export const selectOwnedTournaments = (state) => state.tournaments.ownedTournaments;
export const selectCompetingTournaments = (state) => state.tournaments.competingTournaments;
