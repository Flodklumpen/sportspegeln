import { client } from "../client";

const initialState = [];

export default function getOwnedTournamentsReducer(state = initialState, action) {
  switch (action.type) {
    case 'data/ownedTournamentsLoaded': {
      return action.payload
    }
    default:
      return state
  }
}

export function fetchOwnedTournaments(email, token) {
  return async function fetchUserTournamentsThunk(dispatch) {
    const response = await client.get('/tournament/get_owned_tournaments?email=' + email, email, token);
    dispatch({type: 'data/ownedTournamentsLoaded', payload: response.data});

  }
}

export const selectOwnedTournaments = (state) => state.ownedTournaments;
