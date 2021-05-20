import { client } from "../client";

const initialState = [];

export default function getPastMatchesReducer(state = initialState, action) {
  switch (action.type) {
    case 'data/pastMatchesLoaded': {
      return action.payload;
    }
    default:
      return state
  }
}

export function fetchPastMatches(email, token) {
  return async function fetchPastMatchesThunk(dispatch) {
    const response = await client.get('/tournament/get_past_matches?email=' + email, email, token);
    dispatch({type: 'data/pastMatchesLoaded', payload: response.data});

  }
}
