import { client } from "../client";

const initialState = [];

export default function getFutureMatchesReducer(state = initialState, action) {
  switch (action.type) {
    case 'data/futureMatchesLoaded': {
      return action.payload;
    }
    default:
      return state
  }
}

export function fetchFutureMatches(email, token) {
  return async function fetchFutureMatchesThunk(dispatch) {
    const response = await client.get('/tournament/get_future_matches?email=' + email, email, token);
    dispatch({type: 'data/futureMatchesLoaded', payload: response.data});

  }
}
