import { client } from "../client";

const initialState = [];

export default function getCompetingTournamentsReducer(state = initialState, action) {
  switch (action.type) {
    case 'data/userTournamentsLoaded': {
      return action.payload
    }
    default:
      return state
  }
}

export function fetchCompetingTournaments(email, token) {
  return async function fetchUserTournamentsThunk(dispatch) {
    const response = await client.get('/tournament/get_user_tournaments?email=' + email, email, token);
    dispatch({type: 'data/userTournamentsLoaded', payload: response.data});

  }
}

export const selectCompetingTournaments = (state) => state.competingTournaments;
