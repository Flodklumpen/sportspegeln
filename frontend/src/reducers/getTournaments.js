import { client } from "../client";

const initialState = [];

export default function getTournamentsReducer(state = initialState, action) {
  switch (action.type) {
    case 'data/tournamentsLoaded': {
      return action.payload
    }
    default:
      return state
  }
}

export function fetchTournaments() {
  return async function fetchTournamentsThunk(dispatch) {
    const response = await client.get('/tournament/get_tournaments', "", "");
    dispatch({type: 'data/tournamentsLoaded', payload: response.data});

  }
}

export const selectTournaments = (state) => state.tournaments;
